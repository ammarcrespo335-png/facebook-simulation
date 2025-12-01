"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePost = void 0;
const mongoose_1 = require("mongoose");
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
class CreatePost {
    postRepo = new PostRepository_1.PostRepo();
    async CreatePost(req, res, next) {
        try {
            const userId = req.user?._id;
            if (!userId) {
                throw new ErrorTypes_1.NotFoundExceptions('User not found');
            }
            const { content, images } = req.body;
            const post = await this.postRepo.create({
                data: {
                    CreatedBy: new mongoose_1.Types.ObjectId(userId),
                    content,
                    images: images || [],
                },
            });
            return (0, SuccessHandler_1.SuccessHandler)({
                res,
                msg: 'post is created',
                data: { post },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CreatePost = CreatePost;
