"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./bootstrap");
const AuthController_1 = __importDefault(require("./modules/AuthModule/AuthController"));
const Routes_1 = __importDefault(require("./modules/Routes"));
Routes_1.default.use('/api/v1/auth', AuthController_1.default);
(0, bootstrap_1.bootstrap)();
