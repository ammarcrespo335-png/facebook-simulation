"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePost = void 0;
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class DeletePost {
    postRepo = new PostRepository_1.PostRepo();
    async DeletePost(req, res, next) {
        try {
            const { postId } = req.params;
            const userId = req.user?._id.toString();
            if (!userId) {
                throw new ErrorTypes_1.NotFoundExceptions('userId not found');
            }
            const deleted = (await this.postRepo.deletePost(postId, userId));
            if (!deleted) {
                throw new ErrorTypes_1.NotFoundExceptions('No post yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({ res, msg: 'post is deleted', data: { deleted } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DeletePost = DeletePost;
