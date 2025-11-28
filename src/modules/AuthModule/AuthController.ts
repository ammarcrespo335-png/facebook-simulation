import { resendEmailOtpSchema } from './AuthServices/resendEmailOtp/resendEmailValidation'
import { refreshTokenService } from './AuthServices/refreshToken/refreshToken'
import { ConfirmEmailSchema } from './AuthServices/ConfirmEmailService/ConfirmEmailValidation'
import { ConfirmEmail } from './AuthServices/ConfirmEmailService/ConfirmEmail'
import { Router } from 'express'
import { SignUpSchema } from './AuthServices/SignUpService/SignUpValidation'
import validation from '../../middleware/ValidationMiddleware'
import { SignUpService } from './AuthServices/SignUpService/SignUpService'
import { resendOtpService } from './AuthServices/resendEmailOtp/resendEmailOtp'

import { loginService } from './AuthServices/loginService/loginService'
import { loginSchema } from './AuthServices/loginService/loginSchema'
import { GetUserService } from './AuthServices/getUserProfile/getUserProfile'
import { auth } from '../../middleware/authMiddleware'

import { ForgetPassService } from './AuthServices/forgetPasswordService/ForgetPassService'
import { resetForgetPasswordService } from './AuthServices/resetForgetPasswordService/resetForgetPass'
import { multerFile, StoreInEnum } from '../../utils/multer/multer'
import { ImagesController } from './AuthServices/Upload/Images'
import { SendFriendRequest } from './AuthServices/SendFriendRequest/SendFriendRequest'
import chatRouter from '../chatModule/ChatController'

const authRouter = Router()
authRouter.use('/:id/chat', chatRouter)
const signUpService = new SignUpService()
authRouter.post(
  '/signup',
  validation(SignUpSchema),
  signUpService.signUp.bind(signUpService)
)

const ConfirmEmailService = new ConfirmEmail()
authRouter.patch(
  '/confirmEmail',
  validation(ConfirmEmailSchema),
  ConfirmEmailService.ConfirmEmail.bind(ConfirmEmailService)
)

const resendEmailOtpService = new resendOtpService()
authRouter.patch(
  '/resendOtp',
  validation(resendEmailOtpSchema),
  resendEmailOtpService.resendEmailOtp.bind(resendEmailOtpService)
)
const login = new loginService()
authRouter.post(
  '/login',
  validation(loginSchema),
  login.loginService.bind(login)
)
const getUser = new GetUserService()
authRouter.get('/me', auth, getUser.getUserProfile.bind(getUser))

const refreshToken = new refreshTokenService()
authRouter.post('/refreshToken', refreshToken.refreshToken.bind(refreshToken))

const ForgetPassword = new ForgetPassService()
authRouter.patch(
  '/forgetPassword',
  ForgetPassword.ForgetPass.bind(ForgetPassword)
)
const Reset_Password = new resetForgetPasswordService()
authRouter.patch(
  '/reset_forget_Pass',
  Reset_Password.resetForgetPassword.bind(Reset_Password)
)

const ResendFriendRequest = new SendFriendRequest()
authRouter.patch(
  '/send-friend-request',
  auth,
  ResendFriendRequest.FriendRequest.bind(ResendFriendRequest)
)
const AcceptFriendRequest = new SendFriendRequest()
authRouter.patch(
  '/accept-friend-request/:id',
  auth,
  AcceptFriendRequest.AcceptFriendRequest.bind(AcceptFriendRequest)
)

const imagesController = new ImagesController()
authRouter.patch(
  '/Profile-Image',
  multerFile({ storeIn: StoreInEnum.memory }).single('image'),
  auth,
  imagesController.uploadProfileImage
)
authRouter.patch(
  '/cover-Image',
  multerFile({ storeIn: StoreInEnum.memory }).array('images'),
  auth,
  imagesController.uploadCoverImage
)

export default authRouter
