import { Request, Response, NextFunction } from 'express'
import { UserRepo } from '../../../../DB/repositories/UserRepository'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { loginServiceDto } from '../AuthCore/AuthDto'
import {
  CAppError,
  invalidCredentialsExceptions,
} from '../../../../utils/errors/ErrorTypes'
import { compare } from '../../../../utils/Security/Hash'
import { generateToken } from '../../../../utils/Security/token'

export class loginService {
  private UserModel = new UserRepo()

  loginService = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password }: loginServiceDto = req.body
    const user = await this.UserModel.findByEmail({ email })
    if (!user) {
      throw new invalidCredentialsExceptions('invalid Credentials ')
    }
    if (!user.isVerified) {
      throw new CAppError('Please verify your email before logging in', 403)
    }
    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new invalidCredentialsExceptions('invalid Credentials ')
    }
    const accessToken = generateToken({
      payload: {
        _id: user._id,
      },
      signature: process.env.ACCESS_SIGNATURE as string,
      options: {
        expiresIn: '1h',
      },
    })
    const refreshToken = generateToken({
      payload: {
        _id: user._id,
      },
      signature: process.env.REFRESH_SIGNATURE as string,
      options: {
        expiresIn: '10d',
      },
    })
    const safeUser: any = user.toObject()
    delete safeUser.password
    delete safeUser.EmailOtp

    return SuccessHandler({
      res,
      data: { user: safeUser, tokens: { accessToken, refreshToken } },
      msg: 'User logged in successfully',
    })
  }
}
