"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const ChatRepository_1 = require("../../DB/repositories/ChatRepository");
const SuccessHandler_1 = require("../../utils/SuccessHandler");
const DBRepository_1 = require("../../DB/repositories/DBRepository");
const ErrorTypes_1 = require("../../utils/errors/ErrorTypes");
const nanoid_1 = require("nanoid");
class ChatService {
    ChatModel = new ChatRepository_1.ChatRepo();
    UserModel = new DBRepository_1.UserRepo();
    getChat = async (req, res, next) => {
        try {
            const authUser = res.locals.user;
            if (!authUser)
                throw new Error('Authenticated user missing');
            const { id } = req.params;
            const friend = await this.UserModel.findById({ id });
            if (!friend)
                throw new ErrorTypes_1.NotFoundExceptions('user not found');
            let chat = await this.ChatModel.findOne({
                filter: {
                    group: { $exists: false },
                    participants: { $all: [authUser._id, friend._id] },
                },
                options: {
                    populate: [
                        { path: 'participants', select: 'F_NAME L_NAME profileImage' },
                    ],
                },
            });
            if (!chat) {
                chat = (await this.ChatModel.create({
                    data: {
                        participants: [authUser._id, friend._id],
                        createdBy: authUser._id,
                        messages: [],
                    },
                }));
                chat = (await chat?.populate('participants'));
            }
            return (0, SuccessHandler_1.SuccessHandler)({ res, data: chat });
        }
        catch (err) {
            next(err);
        }
    };
    CreateGroupChat = async (req, res, next) => {
        try {
            const { group, participants, } = req.body;
            const user = res.locals.user;
            const DbParticipants = await this.UserModel.find({
                filter: {
                    _id: {
                        $in: participants,
                    },
                },
            });
            if (participants.length !== DbParticipants.length) {
                throw new ErrorTypes_1.NotFoundExceptions('some Participants not found');
            }
            const roomId = (0, nanoid_1.nanoid)(15);
            const NewGroupChat = (await this.ChatModel.create({
                data: {
                    participants: [...participants, user._id],
                    group,
                    createdBy: user._id,
                    roomId,
                },
            }));
            await NewGroupChat.populate('participants', 'F_NAME L_NAME profileImage');
            return (0, SuccessHandler_1.SuccessHandler)({ res, data: { group: NewGroupChat } });
        }
        catch (err) {
            next(err);
        }
    };
    getGroupChat = async (req, res, next) => {
        try {
            const { groupId } = req.params;
            const user = res.locals.user;
            const groupChat = await this.ChatModel.findOne({
                filter: {
                    group: { $exists: true },
                    _id: groupId,
                    participants: { $in: user._id },
                },
                options: {
                    populate: [
                        { path: 'participants', select: 'F_NAME L_NAME profileImage' },
                        {
                            path: 'messages.createdBy',
                            select: 'F_NAME L_NAME profileImage',
                        },
                    ],
                },
            });
            return (0, SuccessHandler_1.SuccessHandler)({ res, data: { groupChat } });
        }
        catch (err) {
            next(err);
        }
    };
}
exports.ChatService = ChatService;
