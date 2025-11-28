"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSocketService = void 0;
const DBRepository_1 = require("../../DB/repositories/DBRepository");
const gateway_1 = require("../gateway/gateway");
const ChatRepository_1 = require("../../DB/repositories/ChatRepository");
const ErrorTypes_1 = require("../../utils/errors/ErrorTypes");
class ChatSocketService {
    UserModel = new DBRepository_1.UserRepo();
    ChatModel = new ChatRepository_1.ChatRepo();
    SendMessage = async (socket, data) => {
        const createdBy = socket.user._id;
        const { content, SendTo } = data;
        const receiver = await this.UserModel.findById({ id: SendTo });
        if (!receiver)
            throw new Error('user not found');
        let chat = await this.ChatModel.findOne({
            filter: {
                group: { $exists: false },
                participants: { $all: [createdBy, receiver._id] },
            },
        });
        if (!chat) {
            chat = (await this.ChatModel.create({
                data: {
                    participants: [createdBy, receiver._id],
                    createdBy,
                    messages: [],
                },
            }));
        }
        const message = {
            content,
            createdBy,
            createdAt: new Date(),
        };
        chat.messages.push(message);
        await chat.save();
        socket.emit('message:sent', {
            chatId: chat._id,
            message,
        });
        const receiverSockets = gateway_1.ConnectedSockets.get(receiver._id.toString()) || [];
        receiverSockets.forEach(sid => {
            socket.to(sid).emit('message:receive', {
                chatId: chat._id,
                message,
            });
        });
    };
    joinRoom = async (socket, roomId) => {
        try {
            const group = await this.ChatModel.findOne({
                filter: {
                    roomId,
                    participants: { $in: [socket.user?._id] },
                    group: { $exists: true },
                },
            });
            if (!group) {
                throw new ErrorTypes_1.NotFoundExceptions('group  not found');
            }
            socket.join(roomId);
            console.log('user joined successfully');
        }
        catch (error) {
            socket.emit('error', {
                type: 'joinRoom',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    };
    SendGroupMessage = async (socket, { content, groupId, }) => {
        try {
            const user = socket.user;
            const group = await this.ChatModel.findOne({
                filter: {
                    _id: groupId,
                    participants: { $in: [socket.user?._id] },
                    group: { $exists: true },
                },
            });
            if (!group) {
                throw new ErrorTypes_1.NotFoundExceptions('group  not found');
            }
            await group.updateOne({
                $push: {
                    messages: {
                        content,
                        createdBy: user?._id,
                    },
                },
            });
            socket.emit('success message', content);
            socket.to(group.roomId).emit('new group message', {
                content, from: user?._id, groupId
            });
        }
        catch (error) {
            socket.emit('error', {
                type: 'joinRoom',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    };
}
exports.ChatSocketService = ChatSocketService;
