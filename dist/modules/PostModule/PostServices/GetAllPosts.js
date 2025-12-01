"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPosts = void 0;
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
class GetAllPosts {
    postRepo = new PostRepository_1.PostRepo();
    async GetAllPosts(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = 10;
            const posts = await this.postRepo.getAllPosts(page, limit);
            if (!posts || posts.length === 0) {
                throw new ErrorTypes_1.NotFoundExceptions('No posts yet');
            }
            return (0, SuccessHandler_1.SuccessHandler)({
                res,
                msg: ' Posts fetched successfully',
                data: { posts },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GetAllPosts = GetAllPosts;
