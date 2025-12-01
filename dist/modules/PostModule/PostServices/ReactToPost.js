"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactToPost = void 0;
const mongoose_1 = require("mongoose");
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
class ReactToPost {
    postRepo = new PostRepository_1.PostRepo();
    async reactToPost(req, res, next) {
        const postId = req.params.postId;
        const userId = req.user?._id.toString();
        if (!userId) {
            throw new ErrorTypes_1.NotFoundExceptions('userId not found');
        }
        const post = await this.postRepo.findById({ id: postId });
        if (!post) {
            throw new ErrorTypes_1.NotFoundExceptions('No post yet');
        }
        if (post.isFrozen) {
            throw new ErrorTypes_1.ForbiddenException('post is frozen and can`t be liked');
        }
        const userPostId = new mongoose_1.Types.ObjectId(userId);
        const alreadyLiked = post.likes.some(id => id.equals(userPostId));
        if (alreadyLiked) {
            post.likes = post.likes.filter(id => !id.equals(userPostId));
        }
        else {
            post.likes.push(userPostId);
        }
        await post.save();
        return (0, SuccessHandler_1.SuccessHandler)({ res, msg: 'Post reaction updated', data: { post } });
    }
}
exports.ReactToPost = ReactToPost;
