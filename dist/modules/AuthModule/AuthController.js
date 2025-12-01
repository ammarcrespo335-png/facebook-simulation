"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resendEmailValidation_1 = require("./AuthServices/resendEmailOtp/resendEmailValidation");
const refreshToken_1 = require("./AuthServices/refreshToken/refreshToken");
const ConfirmEmailValidation_1 = require("./AuthServices/ConfirmEmailService/ConfirmEmailValidation");
const ConfirmEmail_1 = require("./AuthServices/ConfirmEmailService/ConfirmEmail");
const express_1 = require("express");
const SignUpValidation_1 = require("./AuthServices/SignUpService/SignUpValidation");
const ValidationMiddleware_1 = __importDefault(require("../../middleware/ValidationMiddleware"));
const SignUpService_1 = require("./AuthServices/SignUpService/SignUpService");
const resendEmailOtp_1 = require("./AuthServices/resendEmailOtp/resendEmailOtp");
const loginService_1 = require("./AuthServices/loginService/loginService");
const loginSchema_1 = require("./AuthServices/loginService/loginSchema");
const getUserProfile_1 = require("./AuthServices/getUserProfile/getUserProfile");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ForgetPassService_1 = require("./AuthServices/forgetPasswordService/ForgetPassService");
const resetForgetPass_1 = require("./AuthServices/resetForgetPasswordService/resetForgetPass");
const multer_1 = require("../../utils/multer/multer");
const Images_1 = require("./AuthServices/Upload/Images");
const SendFriendRequest_1 = require("./AuthServices/SendFriendRequest/SendFriendRequest");
const ChatController_1 = __importDefault(require("../chatModule/ChatController"));
const authRouter = (0, express_1.Router)();
// Chat routes
authRouter.use('/:id/chat', ChatController_1.default);
// Services Instances
const signUpService = new SignUpService_1.SignUpService();
const confirmEmailService = new ConfirmEmail_1.ConfirmEmail();
const resendEmailOtpService = new resendEmailOtp_1.resendOtpService();
const login = new loginService_1.loginService();
const getUser = new getUserProfile_1.GetUserService();
const refreshToken = new refreshToken_1.refreshTokenService();
const forgetPassword = new ForgetPassService_1.ForgetPassService();
const resetPassword = new resetForgetPass_1.resetForgetPasswordService();
const friendRequestService = new SendFriendRequest_1.SendFriendRequest();
const imagesController = new Images_1.ImagesController();
// Signup
authRouter.post('/signup', (0, ValidationMiddleware_1.default)(SignUpValidation_1.SignUpSchema), signUpService.signUp.bind(signUpService));
// Confirm Email
authRouter.patch('/confirm-email', (0, ValidationMiddleware_1.default)(ConfirmEmailValidation_1.ConfirmEmailSchema), confirmEmailService.ConfirmEmail.bind(confirmEmailService));
// Resend OTP
authRouter.patch('/resend-otp', (0, ValidationMiddleware_1.default)(resendEmailValidation_1.resendEmailOtpSchema), resendEmailOtpService.resendEmailOtp.bind(resendEmailOtpService));
// Login
authRouter.post('/login', (0, ValidationMiddleware_1.default)(loginSchema_1.loginSchema), login.loginService.bind(login));
// Get profile
authRouter.get('/me', authMiddleware_1.auth, getUser.getUserProfile.bind(getUser));
// Refresh token
authRouter.post('/refresh-token', refreshToken.refreshToken.bind(refreshToken));
// Forget password
authRouter.patch('/forget-password', forgetPassword.ForgetPass.bind(forgetPassword));
// Reset forget password
authRouter.patch('/reset-password', resetPassword.resetForgetPassword.bind(resetPassword));
// Friend requests
authRouter.patch('/send-friend-request', authMiddleware_1.auth, friendRequestService.FriendRequest.bind(friendRequestService));
authRouter.patch('/accept-friend-request/:id', authMiddleware_1.auth, friendRequestService.AcceptFriendRequest.bind(friendRequestService));
// Upload profile image
authRouter.patch('/profile-image', authMiddleware_1.auth, (0, multer_1.multerFile)({ storeIn: multer_1.StoreInEnum.memory }).single('image'), imagesController.uploadProfileImage);
// Upload cover images
authRouter.patch('/cover-images', authMiddleware_1.auth, (0, multer_1.multerFile)({ storeIn: multer_1.StoreInEnum.memory }).array('images'), imagesController.uploadCoverImage);
exports.default = authRouter;
