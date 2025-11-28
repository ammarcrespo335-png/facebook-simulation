"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const ChatRepository_1 = require("../../../../DB/repositories/ChatRepository");
class GetUserService {
    ChatModel = new ChatRepository_1.ChatRepo();
    getUserProfile = async (req, res, next) => {
        let user = res.locals.user;
        user = await user.populate([
            {
                path: 'friends',
                select: 'F_NAME L_NAME profileImage',
            },
        ]);
        const GROUPS = await this.ChatModel.find({
            filter: {
                participants: {
                    $in: [user._id],
                },
                group: { $exists: true },
            },
        });
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            msg: 'User profile fetched successfully',
            data: { user, GROUPS },
        });
    };
}
exports.GetUserService = GetUserService;
