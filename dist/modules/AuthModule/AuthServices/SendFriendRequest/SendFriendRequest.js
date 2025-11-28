"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFriendRequest = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
const FriendRequestModel_1 = require("../../../../DB/models/FriendRequestModel");
const DBRepository_1 = require("../../../../DB/repositories/DBRepository");
class SendFriendRequest {
    FriendModel = FriendRequestModel_1.FriendRequestModel;
    UserModel = new DBRepository_1.UserRepo();
    FriendRequest = async (req, res, next) => {
        const authUser = res.locals.user;
        const from = authUser._id;
        const { to } = req.body;
        if (to.toString() === from.toString()) {
            throw new ErrorTypes_1.CAppError('you can`t send friend request to yourself', 400);
        }
        if (!(await this.UserModel.findById({ id: to }))) {
            throw new ErrorTypes_1.NotFoundExceptions('id not found');
        }
        const IsFriends = await this.FriendModel.findOne({
            $or: [
                { from: from, to: to },
                { from: to, to: from },
            ],
        });
        if (IsFriends) {
            throw new ErrorTypes_1.CAppError('friend request already sent or you are friends', 409);
        }
        const friendRequest = await this.FriendModel.create({
            from,
            to,
        });
        return (0, SuccessHandler_1.SuccessHandler)({ res, data: friendRequest });
    };
    AcceptFriendRequest = async (req, res, next) => {
        const authUser = res.locals.user;
        const { id } = req.params;
        const friendRequest = await this.FriendModel.findOne({
            _id: id,
            to: authUser._id,
            acceptedAt: { $exists: false },
        });
        if (!friendRequest) {
            throw new ErrorTypes_1.NotFoundExceptions('friend request not found');
        }
        await friendRequest.updateOne({
            $set: {
                acceptedAt: new Date(),
            },
        });
        await this.UserModel.findOneAndUpdate({
            filter: {
                _id: friendRequest.to,
            },
            update: {
                $addToSet: {
                    friends: friendRequest.from,
                },
            },
        });
        await this.UserModel.findOneAndUpdate({
            filter: {
                _id: friendRequest.from,
            },
            update: {
                $addToSet: {
                    friends: authUser._id,
                },
            },
        });
        return (0, SuccessHandler_1.SuccessHandler)({ res, data: friendRequest });
    };
}
exports.SendFriendRequest = SendFriendRequest;
