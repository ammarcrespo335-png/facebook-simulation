"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ChatService_1 = require("./ChatService");
const chatRouter = (0, express_1.Router)({
    mergeParams: true,
});
const ChatServices = new ChatService_1.ChatService();
chatRouter.get('/:id', authMiddleware_1.auth, ChatServices.getChat.bind(ChatServices));
chatRouter.post('/Create-Group', authMiddleware_1.auth, ChatServices.CreateGroupChat.bind(ChatServices));
chatRouter.get('/get-group-chat/:groupId', authMiddleware_1.auth, ChatServices.getGroupChat.bind(ChatServices));
exports.default = chatRouter;
