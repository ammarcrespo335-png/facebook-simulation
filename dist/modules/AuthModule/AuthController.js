"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthValidation_1 = require("./AuthValidation");
const ValidationMiddleware_1 = __importDefault(require("../../middleware/ValidationMiddleware"));
const SignUpService_1 = require("./AuthServices/SignUpService");
const authRouter = (0, express_1.Router)();
const signUpService = new SignUpService_1.SignUpService();
authRouter.post('/signup', (0, ValidationMiddleware_1.default)(AuthValidation_1.SignUpSchema), signUpService.signUp.bind(signUpService));
exports.default = authRouter;
