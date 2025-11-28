"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmEmail = void 0;
const DBRepository_1 = require("../../../../DB/repositories/DBRepository");
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const Hash_1 = require("../../../../utils/Security/Hash");
class ConfirmEmail {
    UserModel = new DBRepository_1.UserRepo();
    ConfirmEmail = async (req, res, next) => {
        const { email, otp } = req.body;
        const user = await this.UserModel.findByEmail({ email });
        if (!user) {
            throw new ErrorTypes_1.NotFoundExceptions('user not found ');
        }
        if (user.isVerified) {
            throw new ErrorTypes_1.CAppError('email already verified ', 409);
        }
        if (!user.EmailOtp || !user.EmailOtp.otp) {
            throw new ErrorTypes_1.invalidOtpExceptions('otp not found');
        }
        const isExpired = user.EmailOtp.expiredAt <= new Date(Date.now());
        if (isExpired) {
            throw new ErrorTypes_1.OtpExpiredExceptions('otp is expired');
        }
        const isValid = await (0, Hash_1.compare)(otp, String(user.EmailOtp.otp));
        if (!isValid) {
            user.fieldAttemptsCode += 1;
            if (user.fieldAttemptsCode >= 5) {
                user.CodeBan = new Date(Date.now() + 5 * 60 * 1000);
                user.fieldAttemptsCode = 0;
            }
            throw new ErrorTypes_1.invalidOtpExceptions(' otp not true');
        }
        await user.updateOne({
            $unset: {
                EmailOtp: '',
            },
            isVerified: true,
        });
        const updatedUser = await this.UserModel.findByEmail({ email });
        if (!updatedUser) {
            throw new ErrorTypes_1.NotFoundExceptions('user not found after update');
        }
        const { password: _password, EmailOtp, ...safeUser } = updatedUser.toObject();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            data: safeUser,
            msg: 'User confirmed successfully',
        });
    };
}
exports.ConfirmEmail = ConfirmEmail;
