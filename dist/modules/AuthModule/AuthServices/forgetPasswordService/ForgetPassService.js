"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPassService = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const DBRepository_1 = require("../../../../DB/repositories/DBRepository");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const CreateOtp_1 = require("../../../../utils/Email/CreateOtp");
const GenerateHtml_1 = require("../../../../utils/Email/GenerateHtml");
const EmailEvents_1 = require("../../../../utils/Email/EmailEvents");
const Hash_1 = require("../../../../utils/Security/Hash");
class ForgetPassService {
    UserModel = new DBRepository_1.UserRepo();
    ForgetPass = async (req, res, next) => {
        const { email } = req.body;
        const user = await this.UserModel.findByEmail({ email });
        if (!user) {
            throw new ErrorTypes_1.NotFoundExceptions('email not found');
        }
        if (!user.isVerified) {
            throw new ErrorTypes_1.NotVerifiedExceptions('not verified');
        }
        const otp = (0, CreateOtp_1.createOtp)();
        const subject = 'forget password';
        const html = (0, GenerateHtml_1.authTemplate)({
            code: otp.code,
            name: `${user.F_NAME} ${user.L_NAME}`,
            subject,
            appName: 'Social App',
            type: 'reset',
        });
        EmailEvents_1.emailEmitter.publish(EmailEvents_1.EMAIL_EVENTS_ENUM.Reset_Password, {
            to: email,
            subject,
            html,
        });
        await user.updateOne({
            PasswordOtp: {
                otp: await (0, Hash_1.hash)(otp.code),
                expiredAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        });
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            msg: 'OTP sent successfully',
            data: { email },
        });
    };
}
exports.ForgetPassService = ForgetPassService;
