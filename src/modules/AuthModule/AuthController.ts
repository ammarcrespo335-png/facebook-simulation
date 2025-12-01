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

// Chat routes
authRouter.use('/:id/chat', chatRouter)

// Services Instances
const signUpService = new SignUpService()
const confirmEmailService = new ConfirmEmail()
const resendEmailOtpService = new resendOtpService()
const login = new loginService()
const getUser = new GetUserService()
const refreshToken = new refreshTokenService()
const forgetPassword = new ForgetPassService()
const resetPassword = new resetForgetPasswordService()
const friendRequestService = new SendFriendRequest()
const imagesController = new ImagesController()

// Signup
authRouter.post(
  '/signup',
  validation(SignUpSchema),
  signUpService.signUp.bind(signUpService)
)

// Confirm Email
authRouter.patch(
  '/confirm-email',
  validation(ConfirmEmailSchema),
  confirmEmailService.ConfirmEmail.bind(confirmEmailService)
)

// Resend OTP
authRouter.patch(
  '/resend-otp',
  validation(resendEmailOtpSchema),
  resendEmailOtpService.resendEmailOtp.bind(resendEmailOtpService)
)

// Login
authRouter.post(
  '/login',
  validation(loginSchema),
  login.loginService.bind(login)
)

// Get profile
authRouter.get('/me', auth, getUser.getUserProfile.bind(getUser))

// Refresh token
authRouter.post('/refresh-token', refreshToken.refreshToken.bind(refreshToken))

// Forget password
authRouter.patch(
  '/forget-password',
  forgetPassword.ForgetPass.bind(forgetPassword)
)

// Reset forget password
authRouter.patch(
  '/reset-password',
  resetPassword.resetForgetPassword.bind(resetPassword)
)

// Friend requests
authRouter.patch(
  '/send-friend-request',
  auth,
  friendRequestService.FriendRequest.bind(friendRequestService)
)

authRouter.patch(
  '/accept-friend-request/:id',
  auth,
  friendRequestService.AcceptFriendRequest.bind(friendRequestService)
)

// Upload profile image
authRouter.patch(
  '/profile-image',
  auth,
  multerFile({ storeIn: StoreInEnum.memory }).single('image'),
  imagesController.uploadProfileImage
)

// Upload cover images
authRouter.patch(
  '/cover-images',
  auth,
  multerFile({ storeIn: StoreInEnum.memory }).array('images'),
  imagesController.uploadCoverImage
)

export default authRouter
