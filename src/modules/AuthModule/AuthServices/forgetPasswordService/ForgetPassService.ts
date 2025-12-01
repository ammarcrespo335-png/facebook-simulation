import { Request, Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { UserRepo } from '../../../../DB/repositories/UserRepository'
import {
  NotFoundExceptions,
  NotVerifiedExceptions,
} from '../../../../utils/errors/ErrorTypes'
import { createOtp } from '../../../../utils/Email/CreateOtp'
import { authTemplate } from '../../../../utils/Email/GenerateHtml'
import {
  EMAIL_EVENTS_ENUM,
  emailEmitter,
} from '../../../../utils/Email/EmailEvents'
import { hash } from '../../../../utils/Security/Hash'

export class ForgetPassService {
  private UserModel = new UserRepo()

  ForgetPass = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email } = req.body
    const user = await this.UserModel.findByEmail({ email })
    if (!user) {
      throw new NotFoundExceptions('email not found')
    }
    if (!user.isVerified) {
      throw new NotVerifiedExceptions('not verified')
    }
    const otp = createOtp()
    const subject = 'forget password'
    const html = authTemplate({
      code: otp.code,
      name: `${user.F_NAME} ${user.L_NAME}`,
      subject,
      appName: 'Social App',
      type: 'reset',
    })
    emailEmitter.publish(EMAIL_EVENTS_ENUM.Reset_Password, {
      to: email,
      subject,
      html,
    })
    await user.updateOne({
      PasswordOtp: {
        otp: await hash(otp.code),
        expiredAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    })
    return SuccessHandler({
      res,
      msg: 'OTP sent successfully',
      data: { email },
    })
  }
}
