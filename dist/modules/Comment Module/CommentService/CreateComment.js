"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComment = void 0;
const Comment_Repository_1 = require("../../../DB/repositories/Comment Repository");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const mongoose_1 = require("mongoose");
class CreateComment {
    commentRepo = new Comment_Repository_1.CommentRepo();
    async CreateComment(req, res, next) {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                throw new ErrorTypes_1.NotFoundExceptions('userId not found');
            }
            const { content, postId } = req.body;
            const comment = await this.commentRepo.AddComment({
                content,
                postId,
                CreatedBy: new mongoose_1.Types.ObjectId(userId),
            });
            return (0, SuccessHandler_1.SuccessHandler)({
                res,
                msg: 'your comment is added',
                data: { comment },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CreateComment = CreateComment;
