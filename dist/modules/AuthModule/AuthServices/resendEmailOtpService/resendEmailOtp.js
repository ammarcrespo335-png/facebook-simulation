"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtpService = void 0;
const UserRepo_1 = require("../../../../DB/Repos/UserRepo");
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const CreateOtp_1 = require("../../../../utils/Email/CreateOtp");
const GenerateHtml_1 = require("../../../../utils/Email/GenerateHtml");
const EmailEvents_1 = require("../../../../utils/Email/EmailEvents");
const Hash_1 = require("../../../../utils/Security/Hash");
class resendOtpService {
    UserModel = new UserRepo_1.UserRepo();
    resendEmailOtp = async (req, res, next) => {
        const { email } = req.body;
        const user = await this.UserModel.findByEmail({ email });
        if (!user) {
            throw new ErrorTypes_1.NotFoundExceptions('user not found ');
        }
        if (user.isVerified) {
            throw new ErrorTypes_1.CAppError('email already verified ', 409);
        }
        const isExpired = user.EmailOtp.expiredAt <= new Date(Date.now());
        if (!isExpired) {
            throw new ErrorTypes_1.CAppError('otp not expired', 409);
        }
        const otp = (0, CreateOtp_1.createOtp)();
        const html = (0, GenerateHtml_1.authTemplate)({
            code: otp.code,
            name: `${user.F_NAME} ${user.L_NAME}`,
            subject: 'Verify your email',
            appName: 'Social App',
            type: 'verify',
        });
        EmailEvents_1.emailEmitter.publish(EmailEvents_1.EMAIL_EVENTS_ENUM.Verify_Email, {
            to: email,
            subject: 'Verify your email',
            html,
        });
        await user.updateOne({
            $set: {
                EmailOtp: {
                    otp: await (0, Hash_1.hash)(otp.code),
                    expiredAt: new Date(Date.now() + 5 * 60 * 1000),
                },
            },
        });
        return (0, SuccessHandler_1.SuccessHandler)({ res });
    };
}
exports.resendOtpService = resendOtpService;
