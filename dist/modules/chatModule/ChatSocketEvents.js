"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSocketEvents = void 0;
const ChatSocketService_1 = require("./ChatSocketService");
class ChatSocketEvents {
    ChatSocketServices = new ChatSocketService_1.ChatSocketService();
    SendMessage = async (socket) => {
        socket.on('Send Message', data => {
            this.ChatSocketServices.SendMessage(socket, data);
        });
    };
    JoinRoom = async (socket) => {
        socket.on('join group', ({ roomId }) => {
            this.ChatSocketServices.joinRoom(socket, roomId);
        });
    };
    SendGroupMessage = async (socket) => {
        socket.on('send group message', (data) => {
            this.ChatSocketServices.SendGroupMessage(socket, data);
        });
    };
}
exports.ChatSocketEvents = ChatSocketEvents;
