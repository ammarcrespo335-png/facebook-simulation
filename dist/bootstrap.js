"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./modules/Routes"));
const connectDB_1 = require("./DB/config/connectDB");
const app = (0, express_1.default)();
const bootstrap = async () => {
    const port = process.env.PORT || 5500;
    app.use(express_1.default.json());
    app.use('/api/v1', Routes_1.default);
    await (0, connectDB_1.DBconnection)();
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            msg: err.message,
            stack: err.stack,
            status: err.statusCode || 500,
        });
    });
    app.listen(port, () => {
        console.log('server is running on', port);
    });
};
exports.bootstrap = bootstrap;
