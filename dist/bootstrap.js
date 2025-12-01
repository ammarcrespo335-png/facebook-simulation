"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./modules/Routes"));
const connectDB_1 = require("./DB/config/connectDB");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const gateway_1 = require("./modules/gateway/gateway");
const AuthController_1 = __importDefault(require("./modules/AuthModule/AuthController"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const main_graphQl_1 = require("./modules/graphQl/main.graphQl");
const express_graphql_1 = require("express-graphql");
const PostController_1 = require("./modules/PostModule/PostController");
const CommentController_1 = require("./modules/Comment Module/CommentController");
const app = (0, express_1.default)();
const bootstrap = async () => {
    const port = process.env.PORT || 5500;
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)('dev'));
    const createRateLimiter = (maxRequests) => (0, express_rate_limit_1.default)({
        windowMs: 60 * 1000,
        max: maxRequests,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many requests, please try again later.',
    });
    app.use('/api/v1/auth', createRateLimiter(5), AuthController_1.default);
    app.use('/api/v1/post', createRateLimiter(5), PostController_1.PostRouter);
    app.use('/api/v1/comment', createRateLimiter(5), CommentController_1.CommentRouter);
    app.use('/api/v1/chat', createRateLimiter(20));
    app.use('/api/v1', Routes_1.default);
    app.use('/api/v1/graphql', createRateLimiter(5), (0, express_graphql_1.graphqlHTTP)(req => ({
        schema: main_graphQl_1.schema,
        graphiql: true,
        context: { authorization: req.headers.authorization || null },
    })));
    await (0, connectDB_1.DBconnection)();
    app.use((req, res, next) => {
        next({ statusCode: 404, message: 'Route Not Found' });
    });
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            msg: err.message,
            status: err.statusCode || 500,
        });
    });
    const Server = app.listen(port, () => {
        console.log('server is running on', port);
    });
    (0, gateway_1.initialize)(Server);
};
exports.bootstrap = bootstrap;
