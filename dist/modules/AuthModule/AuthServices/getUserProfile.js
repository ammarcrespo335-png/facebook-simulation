"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class GetUserService {
    getUserProfile = async (req, res, next) => {
        const user = res.locals.user;
        const { password, EmailOtp, ...safeUser } = user.toObject();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            data: safeUser,
            msg: 'User profile getting successfully',
        });
    };
}
exports.GetUserService = GetUserService;
