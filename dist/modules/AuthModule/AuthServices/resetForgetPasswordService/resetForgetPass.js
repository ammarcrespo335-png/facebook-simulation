"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetForgetPasswordService = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const UserRepository_1 = require("../../../../DB/repositories/UserRepository");
const Hash_1 = require("../../../../utils/Security/Hash");
class resetForgetPasswordService {
    UserModel = new UserRepository_1.UserRepo();
    resetForgetPassword = async (req, res, next) => {
        const { email, otp, password } = req.body;
        const user = await this.UserModel.findByEmail({ email });
        if (!user) {
            throw new ErrorTypes_1.NotFoundExceptions('email not found');
        }
        if (!user.isVerified) {
            throw new ErrorTypes_1.NotVerifiedExceptions('not verified');
        }
        if (!user.PasswordOtp?.otp) {
            throw new ErrorTypes_1.CAppError('use forget password first', 404);
        }
        const isExpired = new Date(user.EmailOtp.expiredAt) <= new Date();
        if (isExpired) {
            throw new ErrorTypes_1.OtpExpiredExceptions('otp is expired');
        }
        const isValidOtp = await (0, Hash_1.compare)(otp, String(user.PasswordOtp.otp));
        if (!isValidOtp) {
            throw new ErrorTypes_1.CAppError('invalid otp', 404);
        }
        const hashedPassword = await (0, Hash_1.hash)(password);
        await user.updateOne({
            $set: {
                password: hashedPassword,
                $unset: {
                    PasswordOtp: 1,
                },
            },
        });
        return (0, SuccessHandler_1.SuccessHandler)({ res });
    };
}
exports.resetForgetPasswordService = resetForgetPasswordService;
