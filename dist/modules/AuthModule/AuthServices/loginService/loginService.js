"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const UserRepository_1 = require("../../../../DB/repositories/UserRepository");
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const Hash_1 = require("../../../../utils/Security/Hash");
const token_1 = require("../../../../utils/Security/token");
class loginService {
    UserModel = new UserRepository_1.UserRepo();
    loginService = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await this.UserModel.findByEmail({ email });
        if (!user) {
            throw new ErrorTypes_1.invalidCredentialsExceptions('invalid Credentials ');
        }
        if (!user.isVerified) {
            throw new ErrorTypes_1.CAppError('Please verify your email before logging in', 403);
        }
        const isValidPassword = await (0, Hash_1.compare)(password, user.password);
        if (!isValidPassword) {
            throw new ErrorTypes_1.invalidCredentialsExceptions('invalid Credentials ');
        }
        const accessToken = (0, token_1.generateToken)({
            payload: {
                _id: user._id,
            },
            signature: process.env.ACCESS_SIGNATURE,
            options: {
                expiresIn: '1h',
            },
        });
        const refreshToken = (0, token_1.generateToken)({
            payload: {
                _id: user._id,
            },
            signature: process.env.REFRESH_SIGNATURE,
            options: {
                expiresIn: '10d',
            },
        });
        const safeUser = user.toObject();
        delete safeUser.password;
        delete safeUser.EmailOtp;
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            data: { user: safeUser, tokens: { accessToken, refreshToken } },
            msg: 'User logged in successfully',
        });
    };
}
exports.loginService = loginService;
