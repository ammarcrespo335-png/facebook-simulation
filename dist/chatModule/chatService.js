"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const ChatRepository_1 = require("../DB/repositories/ChatRepository");
const SuccessHandler_1 = require("../utils/SuccessHandler");
const DBRepository_1 = require("../DB/repositories/DBRepository");
const ErrorTypes_1 = require("../utils/errors/ErrorTypes");
class ChatService {
    ChatModel = new ChatRepository_1.ChatRepo();
    UserModel = new DBRepository_1.UserRepo();
    getChat = async (req, res, next) => {
        const authUser = res.locals.user;
        const { id } = req.params;
        const friend = await this.UserModel.findById({ id });
        if (!friend) {
            throw new ErrorTypes_1.NotFoundExceptions("user not found");
        }
        let chat = await this.ChatModel.findOne({
            filter: {
                group: {
                    $exists: false
                },
                participants: {
                    $all: [authUser._id, friend._id]
                }
            },
            options: {
                populate: [{
                        path: 'participants',
                        select: 'F_NAME L_NAME profileImage'
                    }]
            }
        });
        return (0, SuccessHandler_1.SuccessHandler)({ res });
    };
}
exports.ChatService = ChatService;
