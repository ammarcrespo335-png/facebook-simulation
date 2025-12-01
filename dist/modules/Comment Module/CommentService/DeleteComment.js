"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComment = void 0;
const Comment_Repository_1 = require("../../../DB/repositories/Comment Repository");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class DeleteComment {
    commentRepo = new Comment_Repository_1.CommentRepo();
    async deleteComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const userId = req.user?._id.toString();
            const deleted = await this.commentRepo.DeleteComment(commentId, userId);
            if (!deleted) {
                throw new ErrorTypes_1.NotFoundExceptions('No comment yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({
                res,
                msg: 'comment is deleted',
                data: { deleted },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DeleteComment = DeleteComment;
