import { JwtPayload } from 'jsonwebtoken'
import {
  ForbiddenException,
  invalidCredentialsExceptions,
  invalidTokenExceptions,
  NotFoundExceptions,
} from '../utils/errors/ErrorTypes'
import { verifyToken } from '../utils/Security/token'
import { UserRepo } from '../DB/repositories/UserRepository'
import { Request, Response, NextFunction } from 'express'
import { HUserDocument, IUser } from '../modules/UserModule/UserTypes'
import { GraphQLError } from 'graphql'

import { PostModel } from '../DB/models/PostModels'
import { IPost } from '../modules/PostModule/PostTypes'

export enum tokenTypesEnum {
  ACCESS_SIGNATURE = 'access',
  REFRESH_SIGNATURE = 'refresh',
}

export interface AuthRequest extends Request {
  user?: HUserDocument
  post?: IPost
}
const UserModel = new UserRepo()

export const decodeToken = async ({
  authorization,
  tokenTypes = tokenTypesEnum.ACCESS_SIGNATURE,
}: {
  authorization: string
  tokenTypes?: tokenTypesEnum
}): Promise<IUser> => {
  if (!authorization) {
    throw new invalidTokenExceptions('Token not provided')
  }

  if (!authorization.startsWith('Bearer ')) {
    throw new invalidTokenExceptions('Invalid Bearer token')
  }

  const token = authorization.split(' ')[1]
  const signature =
    tokenTypes === tokenTypesEnum.ACCESS_SIGNATURE
      ? process.env.ACCESS_SIGNATURE
      : process.env.REFRESH_SIGNATURE

  if (!signature) throw new Error('JWT signature not set in .env')

  let payload: JwtPayload
  if (!token) throw new Error('JWT token not set in env')
  try {
    payload = verifyToken({ token, signature })
  } catch (err) {
    console.error('JWT verification failed:', err)
    throw new invalidTokenExceptions('Invalid token signature')
  }

  const user = await UserModel.findById({ id: payload._id })
  if (!user) {
    throw new invalidCredentialsExceptions('Invalid credentials')
  }

  if (!user.isVerified) {
    throw new invalidTokenExceptions('User is not verified')
  }

  return user
}

export const GraphQlAuth = async (
  authorization: string
): Promise<IUser | null> => {
  if (!authorization) {
    throw new GraphQLError('No authorization token provided', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }

  try {
    const data = await decodeToken({
      authorization,
      tokenTypes: tokenTypesEnum.ACCESS_SIGNATURE,
    })

    return data
  } catch (err) {
    console.log('Auth Error:', err)
    throw new GraphQLError('Authentication failed', {
      extensions: { code: 'UNAUTHORIZED' },
    })
  }
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await decodeToken({
      authorization: req.headers.authorization as string,
      tokenTypes: tokenTypesEnum.ACCESS_SIGNATURE,
    })
    res.locals.user = data
    req.user = data as HUserDocument
    return next()
  } catch (err) {
    console.error('Auth middleware error:', err)
    res.status(401).json({ msg: 'Authentication failed', error: err })
  }
}

export const PostAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const postId = req.params.postId || req.body.postId
  if (!postId) {
    throw new NotFoundExceptions('Post ID is required')
  }
  const post = await PostModel.findById(postId)
  if (!post) {
    throw new NotFoundExceptions('post not found')
  }
  if (post.isFrozen) {
    throw new ForbiddenException('This post is frozen and cannot be modified')
  }

  if (post.CreatedBy.toString() !== req.user?._id.toString()) {
    throw new ForbiddenException('You are not allowed to modify this post')
  }
  next()
}
