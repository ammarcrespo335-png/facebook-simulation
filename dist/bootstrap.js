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
const graphql_http_1 = require("graphql-http");
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
const bootstrap = async () => {
    const port = process.env.PORT || 5500;
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use('/api/v1/auth', (0, express_rate_limit_1.default)({
        windowMs: 1 * 60 * 1000,
        max: 5,
        message: 'Too many login attempts, please try again later.',
    }), AuthController_1.default);
    app.use('/api/v1/chat', (0, express_rate_limit_1.default)({
        windowMs: 1 * 60 * 1000,
        max: 20,
        message: 'Too many requests from this IP, try again later',
    }));
    app.use('/api/v1', Routes_1.default);
    app.all('/GraphQl', authMiddleware_1.GraphQlAuth, (0, graphql_http_1.createHandler)({
        schema: main_graphQl_1.schema,
        context: req => ({
            authorization: req.raw.user,
        }),
    }));
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
