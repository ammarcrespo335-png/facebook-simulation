"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const ChatSocketEvents_1 = require("./ChatSocketEvents");
class ChatGateway {
    ChatGateway = new ChatSocketEvents_1.ChatSocketEvents();
    register = (socket) => {
        this.ChatGateway.SendMessage(socket);
        this.ChatGateway.JoinRoom(socket);
        this.ChatGateway.SendGroupMessage(socket);
    };
}
exports.ChatGateway = ChatGateway;
