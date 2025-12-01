"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSinglePost = void 0;
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class GetSinglePost {
    postRepo = new PostRepository_1.PostRepo();
    async getSinglePost(req, res, next) {
        try {
            const { postId } = req.params;
            const post = await this.postRepo.getSinglePost(postId);
            if (!post) {
                throw new ErrorTypes_1.NotFoundExceptions('No post yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({
                res,
                msg: 'Post fetched successfully',
                data: { post },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GetSinglePost = GetSinglePost;
