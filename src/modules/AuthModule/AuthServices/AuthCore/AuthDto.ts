import { resendEmailOtpSchema } from '../resendEmailOtp/resendEmailValidation'
import z from 'zod'
import { SignUpSchema } from '../SignUpService/SignUpValidation'
import { ConfirmEmailSchema } from '../ConfirmEmailService/ConfirmEmailValidation'
import { loginSchema } from '../loginService/loginSchema'

export type SignUpDto = z.Infer<typeof SignUpSchema>
export type confirmEmailDto = z.infer<typeof ConfirmEmailSchema>
export type resendEmailOtpDto = z.infer<typeof resendEmailOtpSchema>
export type loginServiceDto = z.infer<typeof loginSchema>
