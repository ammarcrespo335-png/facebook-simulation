import type { NextFunction, Request, Response } from 'express'
import { SignUpDto } from '../AuthCore/AuthDto'
import { CAppError } from '../../../../utils/errors/ErrorTypes'
import { UserRepo } from '../../../../DB/repositories/DBRepository'
import { hash } from '../../../../utils/Security/Hash'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { authTemplate } from '../../../../utils/Email/GenerateHtml'
import { createOtp } from '../../../../utils/Email/CreateOtp'
import {
  EMAIL_EVENTS_ENUM,
  emailEmitter,
} from '../../../../utils/Email/EmailEvents'

export class SignUpService {
  private userRepo = new UserRepo()
  signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { F_NAME, L_NAME, Age, email, password, Phone }: SignUpDto = req.body
    const IsEmailExist = await this.userRepo.findByEmail({ email })
    if (IsEmailExist) {
      throw new CAppError('email is already exist ', 409)
    }
    const otp = createOtp()
    const user = await this.userRepo.create({
      data: {
        F_NAME,
        L_NAME,
        Phone,
        Age: Age as number,
        email,
        password: await hash(password),
        EmailOtp: {
          otp: await hash(otp.code),
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      },
    })
    if (!user) {
      throw new CAppError('User could not be created', 500)
    }
    const html = authTemplate({
      code: otp.code,
      name: `${F_NAME} ${L_NAME}`,
      subject: 'Verify your email',
      appName: 'Social App',
      type: 'verify',
    })
    emailEmitter.publish(EMAIL_EVENTS_ENUM.Verify_Email, {
      to: email,
      subject: 'Verify your email',
      html,
    })

    const { password: _password, EmailOtp, ...safeUser } = user.toObject()

    return SuccessHandler({
      res,
      data: safeUser,
      msg: 'User created successfully',
    })
  }
}
