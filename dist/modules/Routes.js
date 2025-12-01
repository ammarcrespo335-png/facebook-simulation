"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./AuthModule/AuthController"));
const ChatController_1 = __importDefault(require("./chatModule/ChatController"));
const PostController_1 = require("./PostModule/PostController");
const CommentController_1 = require("./Comment Module/CommentController");
const router = (0, express_1.default)();
router.use('/auth', AuthController_1.default);
router.use('/chat', ChatController_1.default);
router.use('/post', PostController_1.PostRouter);
router.use('/post', CommentController_1.CommentRouter);
exports.default = router;
