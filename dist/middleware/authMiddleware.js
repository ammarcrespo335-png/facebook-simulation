"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.GraphQlAuth = exports.decodeToken = exports.tokenTypesEnum = void 0;
const ErrorTypes_1 = require("../utils/errors/ErrorTypes");
const token_1 = require("../utils/Security/token");
const DBRepository_1 = require("../DB/repositories/DBRepository");
var tokenTypesEnum;
(function (tokenTypesEnum) {
    tokenTypesEnum["ACCESS_SIGNATURE"] = "access";
    tokenTypesEnum["REFRESH_SIGNATURE"] = "refresh";
})(tokenTypesEnum || (exports.tokenTypesEnum = tokenTypesEnum = {}));
const UserModel = new DBRepository_1.UserRepo();
const decodeToken = async ({ authorization, tokenTypes = tokenTypesEnum.ACCESS_SIGNATURE, }) => {
    if (!authorization) {
        throw new ErrorTypes_1.invalidTokenExceptions('Token not provided');
    }
    if (!authorization.startsWith('Bearer ')) {
        throw new ErrorTypes_1.invalidTokenExceptions('Invalid Bearer token');
    }
    const token = authorization.split(' ')[1];
    const signature = tokenTypes === tokenTypesEnum.ACCESS_SIGNATURE
        ? process.env.ACCESS_SIGNATURE
        : process.env.REFRESH_SIGNATURE;
    if (!signature)
        throw new Error('JWT signature not set in .env');
    let payload;
    if (!token)
        throw new Error('JWT token not set in env');
    try {
        payload = (0, token_1.verifyToken)({ token, signature });
    }
    catch (err) {
        console.error('JWT verification failed:', err);
        throw new ErrorTypes_1.invalidTokenExceptions('Invalid token signature');
    }
    const user = await UserModel.findById({ id: payload._id });
    if (!user) {
        throw new ErrorTypes_1.invalidCredentialsExceptions('Invalid credentials');
    }
    if (!user.isVerified) {
        throw new ErrorTypes_1.invalidTokenExceptions('User is not verified');
    }
    return user;
};
exports.decodeToken = decodeToken;
const GraphQlAuth = async (authorization) => {
    if (!authorization || typeof authorization !== 'string')
        return null;
    try {
        const data = await (0, exports.decodeToken)({
            authorization: authorization,
            tokenTypes: tokenTypesEnum.ACCESS_SIGNATURE,
        });
        return data;
    }
    catch (err) {
        console.log({ err });
    }
};
exports.GraphQlAuth = GraphQlAuth;
const auth = async (req, res, next) => {
    try {
        const data = await (0, exports.decodeToken)({
            authorization: req.headers.authorization,
            tokenTypes: tokenTypesEnum.ACCESS_SIGNATURE,
        });
        res.locals.user = data;
        req.user = data;
        return next();
    }
    catch (err) {
        console.error('Auth middleware error:', err);
        res.status(401).json({ msg: 'Authentication failed', error: err });
    }
};
exports.auth = auth;
