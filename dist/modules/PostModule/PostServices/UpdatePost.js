"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePost = void 0;
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class UpdatePost {
    postRepo = new PostRepository_1.PostRepo();
    async UpdatePost(req, res, next) {
        try {
            const { postId } = req.params;
            const userId = req.user?._id.toString();
            if (!userId) {
                throw new ErrorTypes_1.NotFoundExceptions('userId not found');
            }
            const { content, images } = req.body;
            const updated = await this.postRepo.updatePost(postId, userId, {
                content,
                images,
            });
            if (!updated) {
                throw new ErrorTypes_1.NotFoundExceptions('No post yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({ res, msg: 'post is updated', data: { updated } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UpdatePost = UpdatePost;
