"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const authMiddleware_1 = require("../../../../middleware/authMiddleware");
const token_1 = require("../../../../utils/Security/token");
class refreshTokenService {
    refreshToken = async (req, res, next) => {
        const { authorization } = req.headers;
        const user = await (0, authMiddleware_1.decodeToken)({
            authorization: authorization,
            tokenTypes: authMiddleware_1.tokenTypesEnum.REFRESH_SIGNATURE,
        });
        const accessToken = (0, token_1.generateToken)({
            payload: {
                _id: user._id,
            },
            signature: process.env.ACCESS_SIGNATURE,
            options: {
                expiresIn: '1h',
            },
        });
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            data: { accessToken },
            msg: 'Token refreshed successfully',
        });
    };
}
exports.refreshTokenService = refreshTokenService;
