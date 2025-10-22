import { Router } from 'express'
import { SignUpSchema } from './AuthValidation'
import validation from '../../middleware/ValidationMiddleware'
import { SignUpService } from './AuthServices/SignUpService'
const authRouter = Router()

const signUpService = new SignUpService()
authRouter.post(
  '/signup',
  validation(SignUpSchema),
  signUpService.signUp.bind(signUpService)
)
export default authRouter
