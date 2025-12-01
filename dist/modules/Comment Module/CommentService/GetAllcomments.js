"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllComments = void 0;
const Comment_Repository_1 = require("../../../DB/repositories/Comment Repository");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
class GetAllComments {
    commentRepo = new Comment_Repository_1.CommentRepo();
    async getAllComments(req, res, next) {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({ msg: 'postId is required' });
            }
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = 10;
            const comments = await this.commentRepo.GetAllComments(postId, page, limit);
            if (!comments || comments.length === 0) {
                throw new ErrorTypes_1.NotFoundExceptions('No comments yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({ res, data: { comments } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GetAllComments = GetAllComments;
