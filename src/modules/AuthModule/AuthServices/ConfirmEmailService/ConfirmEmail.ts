import { Response, Request, NextFunction } from 'express'
import { UserRepo } from '../../../../DB/repositories/UserRepository'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { confirmEmailDto } from '../AuthCore/AuthDto'
import {
  CAppError,
  invalidOtpExceptions,
  NotFoundExceptions,
  OtpExpiredExceptions,
} from '../../../../utils/errors/ErrorTypes'
import { compare } from '../../../../utils/Security/Hash'

export class ConfirmEmail {
  private UserModel = new UserRepo()
  ConfirmEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, otp }: confirmEmailDto = req.body
    const user = await this.UserModel.findByEmail({ email })
    if (!user) {
      throw new NotFoundExceptions('user not found ')
    }
    if (user.isVerified) {
      throw new CAppError('email already verified ', 409)
    }

    if (!user.EmailOtp || !user.EmailOtp.otp) {
      throw new invalidOtpExceptions('otp not found')
    }
    const isExpired = user.EmailOtp.expiredAt <= new Date(Date.now())
    if (isExpired) {
      throw new OtpExpiredExceptions('otp is expired')
    }
    const isValid = await compare(otp, String(user.EmailOtp.otp))

    if (!isValid) {
      user.fieldAttemptsCode += 1
      if (user.fieldAttemptsCode >= 5) {
        user.CodeBan = new Date(Date.now() + 5 * 60 * 1000)
        user.fieldAttemptsCode = 0
      }

      throw new invalidOtpExceptions(' otp not true')
    }
    await user.updateOne({
      $unset: {
        EmailOtp: '',
      },
      isVerified: true,
    })
    const updatedUser = await this.UserModel.findByEmail({ email })
    if (!updatedUser) {
      throw new NotFoundExceptions('user not found after update')
    }
    const {
      password: _password,
      EmailOtp,
      ...safeUser
    } = updatedUser.toObject()

    return SuccessHandler({
      res,
      data: safeUser,
      msg: 'User confirmed successfully',
    })
  }
}
