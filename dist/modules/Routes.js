"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./AuthModule/AuthController"));
const ChatController_1 = __importDefault(require("./chatModule/ChatController"));
const router = (0, express_1.default)();
router.use('/auth', AuthController_1.default);
router.use('/chat', ChatController_1.default);
exports.default = router;
