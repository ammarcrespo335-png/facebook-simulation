"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepo = void 0;
const CommentModel_1 = require("../models/CommentModel");
const DBRepository_1 = require("./DBRepository");
class CommentRepo extends DBRepository_1.DBRepo {
    model;
    constructor(model = CommentModel_1.CommentModel) {
        super(CommentModel_1.CommentModel);
        this.model = model;
    }
    async GetAllComments(postId, page, limit) {
        const skip = (page - 1) * limit;
        return this.model
            .find({ postId })
            .populate('CreatedBy', 'F_NAME L_NAME profileImage')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }
    async AddComment(data) {
        return this.model.create(data);
    }
    async DeleteComment(commentId, userId) {
        return this.model.findOneAndDelete({
            _id: commentId,
            CreatedBy: userId,
        });
    }
    async UpdateComment(commentId, userId, data) {
        return this.model.findOneAndUpdate({ _id: commentId, CreatedBy: userId }, { $set: data }, { new: true });
    }
}
exports.CommentRepo = CommentRepo;
