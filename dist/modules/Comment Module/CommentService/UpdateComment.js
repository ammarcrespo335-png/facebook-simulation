"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComment = void 0;
const Comment_Repository_1 = require("../../../DB/repositories/Comment Repository");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class UpdateComment {
    commentRepo = new Comment_Repository_1.CommentRepo();
    async updateComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const userId = req.user?._id.toString();
            const { content } = req.body;
            const updated = await this.commentRepo.UpdateComment(commentId, userId, { content });
            if (!updated) {
                throw new ErrorTypes_1.NotFoundExceptions('No comment yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({ res, msg: 'comment is updated', data: { updated } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UpdateComment = UpdateComment;
