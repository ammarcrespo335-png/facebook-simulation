"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepo = void 0;
const UserRepository_1 = require("./UserRepository");
const ChatModel_1 = require("../models/ChatModel");
class ChatRepo extends UserRepository_1.DBRepo {
    model;
    constructor(model = ChatModel_1.ChatModel) {
        super(ChatModel_1.ChatModel);
        this.model = model;
    }
}
exports.ChatRepo = ChatRepo;
