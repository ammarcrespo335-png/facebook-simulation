"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactToComment = void 0;
const mongoose_1 = require("mongoose");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
const Comment_Repository_1 = require("../../../DB/repositories/Comment Repository");
class ReactToComment {
    commentRepo = new Comment_Repository_1.CommentRepo();
    async reactToComment(req, res, next) {
        const commentId = req.params.commentId;
        const userId = req.user?._id.toString();
        const comment = await this.commentRepo.findById({ id: commentId });
        if (!comment) {
            throw new ErrorTypes_1.NotFoundExceptions('No comment yet');
        }
        if (comment.isFrozen) {
            throw new ErrorTypes_1.ForbiddenException('post is frozen and can`t be liked');
        }
        const userCommentId = new mongoose_1.Types.ObjectId(userId);
        const alreadyLiked = comment.likes.some(id => id.toString() === userCommentId.toString());
        if (alreadyLiked) {
            comment.likes = comment.likes.filter(id => id.toString() !== userCommentId.toString());
        }
        else {
            comment.likes.push(userCommentId);
        }
        await comment.save();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            msg: 'comment reaction updated',
            data: { comment },
        });
    }
}
exports.ReactToComment = ReactToComment;
