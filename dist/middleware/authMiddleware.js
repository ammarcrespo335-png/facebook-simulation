"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAuth = exports.auth = exports.GraphQlAuth = exports.decodeToken = exports.tokenTypesEnum = void 0;
const ErrorTypes_1 = require("../utils/errors/ErrorTypes");
const token_1 = require("../utils/Security/token");
const UserRepository_1 = require("../DB/repositories/UserRepository");
const graphql_1 = require("graphql");
const PostModels_1 = require("../DB/models/PostModels");
var tokenTypesEnum;
(function (tokenTypesEnum) {
    tokenTypesEnum["ACCESS_SIGNATURE"] = "access";
    tokenTypesEnum["REFRESH_SIGNATURE"] = "refresh";
})(tokenTypesEnum || (exports.tokenTypesEnum = tokenTypesEnum = {}));
const UserModel = new UserRepository_1.UserRepo();
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
    if (!authorization) {
        throw new graphql_1.GraphQLError('No authorization token provided', {
            extensions: { code: 'UNAUTHORIZED' },
        });
    }
    try {
        const data = await (0, exports.decodeToken)({
            authorization,
            tokenTypes: tokenTypesEnum.ACCESS_SIGNATURE,
        });
        return data;
    }
    catch (err) {
        console.log('Auth Error:', err);
        throw new graphql_1.GraphQLError('Authentication failed', {
            extensions: { code: 'UNAUTHORIZED' },
        });
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
const PostAuth = async (req, res, next) => {
    const postId = req.params.postId || req.body.postId;
    if (!postId) {
        throw new ErrorTypes_1.NotFoundExceptions('Post ID is required');
    }
    const post = await PostModels_1.PostModel.findById(postId);
    if (!post) {
        throw new ErrorTypes_1.NotFoundExceptions('post not found');
    }
    if (post.isFrozen) {
        throw new ErrorTypes_1.ForbiddenException('This post is frozen and cannot be modified');
    }
    if (post.CreatedBy.toString() !== req.user?._id.toString()) {
        throw new ErrorTypes_1.ForbiddenException('You are not allowed to modify this post');
    }
    next();
};
exports.PostAuth = PostAuth;
