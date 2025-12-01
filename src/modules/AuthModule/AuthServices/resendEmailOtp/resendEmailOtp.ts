import { Response, Request, NextFunction } from 'express'
import { UserRepo } from '../../../../DB/repositories/UserRepository'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { resendEmailOtpDto } from '../AuthCore/AuthDto'
import {
  CAppError,
  NotFoundExceptions,
} from '../../../../utils/errors/ErrorTypes'
import { createOtp } from '../../../../utils/Email/CreateOtp'
import { authTemplate } from '../../../../utils/Email/GenerateHtml'
import {
  EMAIL_EVENTS_ENUM,
  emailEmitter,
} from '../../../../utils/Email/EmailEvents'
import { hash } from '../../../../utils/Security/Hash'
export class resendOtpService {
  private UserModel = new UserRepo()
  resendEmailOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email }: resendEmailOtpDto = req.body
    const user = await this.UserModel.findByEmail({ email })
    if (!user) {
      throw new NotFoundExceptions('user not found ')
    }
    if (user.isVerified) {
      throw new CAppError('email already verified ', 409)
    }

    const isExpired = user.EmailOtp.expiredAt <= new Date(Date.now())
    if (!isExpired) {
      throw new CAppError('otp not expired', 409)
    }
    const otp = createOtp()
    const html = authTemplate({
      code: otp.code,
      name: `${user.F_NAME} ${user.L_NAME}`,
      subject: 'Verify your email',
      appName: 'Social App',
      type: 'verify',
    })
    emailEmitter.publish(EMAIL_EVENTS_ENUM.Verify_Email, {
      to: email,
      subject: 'Verify your email',
      html,
    })
    await user.updateOne({
      $set: {
        EmailOtp: {
          otp: await hash(otp.code),
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      },
    })

    return SuccessHandler({ res })
  }
}
