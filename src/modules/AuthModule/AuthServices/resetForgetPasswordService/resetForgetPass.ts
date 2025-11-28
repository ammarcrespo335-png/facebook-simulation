import { Request, Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import {
  CAppError,
  NotFoundExceptions,
  NotVerifiedExceptions,
  OtpExpiredExceptions,
} from '../../../../utils/errors/ErrorTypes'
import { UserRepo } from '../../../../DB/repositories/DBRepository'
import { compare, hash } from '../../../../utils/Security/Hash'

export class resetForgetPasswordService {
  private UserModel = new UserRepo()
  resetForgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, otp, password } = req.body
    const user = await this.UserModel.findByEmail({ email })
    if (!user) {
      throw new NotFoundExceptions('email not found')
    }
    if (!user.isVerified) {
      throw new NotVerifiedExceptions('not verified')
    }
    if (!user.PasswordOtp?.otp) {
      throw new CAppError('use forget password first', 404)
    }

    const isExpired = new Date(user.EmailOtp.expiredAt) <= new Date()
    if (isExpired) {
      throw new OtpExpiredExceptions('otp is expired')
    }
    const isValidOtp = await compare(otp, String(user.PasswordOtp.otp))
    if (!isValidOtp) {
      throw new CAppError('invalid otp', 404)
    }
    const hashedPassword = await hash(password)
    await user.updateOne({
      $set: {
        password: hashedPassword,
        $unset: {
          PasswordOtp: 1,
        },
      },
    })

    return SuccessHandler({ res })
  }
}
