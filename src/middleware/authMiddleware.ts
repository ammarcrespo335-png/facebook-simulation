import { JwtPayload } from 'jsonwebtoken'
import {
  invalidCredentialsExceptions,
  invalidTokenExceptions,
} from '../utils/errors/ErrorTypes'
import { verifyToken } from '../utils/Security/token'
import { UserRepo } from '../DB/repositories/DBRepository'
import { Request, Response, NextFunction } from 'express'
import { HUserDocument, IUser } from '../modules/UserModule/UserTypes'

export enum tokenTypesEnum {
  ACCESS_SIGNATURE = 'access',
  REFRESH_SIGNATURE = 'refresh',
}

export interface AuthRequest extends Request {
  user?: HUserDocument
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

export const GraphQlAuth = async (authorization: string): Promise<IUser | any> => {
  if (!authorization || typeof authorization !== 'string')
    return null
  try {
    const data = await decodeToken({
      authorization: authorization,
      tokenTypes: tokenTypesEnum.ACCESS_SIGNATURE,
    })
    return data
  } catch (err) {
    console.log({ err })
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
