"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.ConnectedSockets = void 0;
const socket_io_1 = require("socket.io");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ChatGateway_1 = require("../chatModule/ChatGateway");
exports.ConnectedSockets = new Map();
const initialize = (HttpServer) => {
    const ChatGatewayData = new ChatGateway_1.ChatGateway();
    const io = new socket_io_1.Server(HttpServer, {
        cors: {
            origin: '*',
        },
    });
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.authorization;
            const user = await (0, authMiddleware_1.decodeToken)({ authorization: token });
            socket.user = user;
            next();
        }
        catch (error) {
            next(new Error('Authentication error'));
        }
    });
    const connect = (socket) => {
        const CurrentSockets = exports.ConnectedSockets.get(socket.user?._id.toString()) || [];
        CurrentSockets.push(socket.id);
        exports.ConnectedSockets.set(socket.user?._id.toString(), CurrentSockets);
        console.log({ ConnectedSockets: exports.ConnectedSockets });
    };
    const disconnect = (socket) => {
        socket.on('disconnect', () => {
            let CurrentSockets = exports.ConnectedSockets.get(socket.user?._id.toString());
            CurrentSockets = CurrentSockets?.filter(id => {
                return id !== socket.id;
            });
            exports.ConnectedSockets.set(socket.user?._id.toString(), CurrentSockets || []);
            console.log({ ConnectedSockets: exports.ConnectedSockets });
        });
    };
    io.on('connection', (socket) => {
        ChatGatewayData.register(socket);
        connect(socket);
        disconnect(socket);
    });
};
exports.initialize = initialize;
