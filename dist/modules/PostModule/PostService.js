"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const mongoose_1 = require("mongoose");
const PostRepository_1 = require("../../DB/repositories/PostRepository");
const ErrorTypes_1 = require("../../utils/errors/ErrorTypes");
class PostService {
    postRepo = new PostRepository_1.PostRepo();
    async CreatePost(userId, data) {
        return this.postRepo.create({
            data: {
                CreatedBy: new mongoose_1.Types.ObjectId(userId),
                content: data.content,
                images: data.images || [],
            },
        });
    }
    async reactToPost(postId, userId) {
        const post = await this.postRepo.findById({ id: postId });
        if (!post) {
            throw new ErrorTypes_1.NotFoundExceptions('post not found');
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
        return post;
    }
}
exports.PostService = PostService;
