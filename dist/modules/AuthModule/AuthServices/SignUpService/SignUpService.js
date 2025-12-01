"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpService = void 0;
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const UserRepository_1 = require("../../../../DB/repositories/UserRepository");
const Hash_1 = require("../../../../utils/Security/Hash");
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const GenerateHtml_1 = require("../../../../utils/Email/GenerateHtml");
const CreateOtp_1 = require("../../../../utils/Email/CreateOtp");
const EmailEvents_1 = require("../../../../utils/Email/EmailEvents");
class SignUpService {
    userRepo = new UserRepository_1.UserRepo();
    signUp = async (req, res, next) => {
        const { F_NAME, L_NAME, Age, email, password, Phone } = req.body;
        const IsEmailExist = await this.userRepo.findByEmail({ email });
        if (IsEmailExist) {
            throw new ErrorTypes_1.CAppError('email is already exist ', 409);
        }
        const otp = (0, CreateOtp_1.createOtp)();
        const user = await this.userRepo.create({
            data: {
                F_NAME,
                L_NAME,
                Phone,
                Age: Age,
                email,
                password: await (0, Hash_1.hash)(password),
                EmailOtp: {
                    otp: await (0, Hash_1.hash)(otp.code),
                    expiredAt: new Date(Date.now() + 5 * 60 * 1000),
                },
            },
        });
        if (!user) {
            throw new ErrorTypes_1.CAppError('User could not be created', 500);
        }
        const html = (0, GenerateHtml_1.authTemplate)({
            code: otp.code,
            name: `${F_NAME} ${L_NAME}`,
            subject: 'Verify your email',
            appName: 'Social App',
            type: 'verify',
        });
        EmailEvents_1.emailEmitter.publish(EmailEvents_1.EMAIL_EVENTS_ENUM.Verify_Email, {
            to: email,
            subject: 'Verify your email',
            html,
        });
        const { password: _password, EmailOtp, ...safeUser } = user.toObject();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            data: safeUser,
            msg: 'User created successfully',
        });
    };
}
exports.SignUpService = SignUpService;
