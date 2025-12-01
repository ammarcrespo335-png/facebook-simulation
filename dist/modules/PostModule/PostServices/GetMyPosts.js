"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPosts = void 0;
const PostRepository_1 = require("../../../DB/repositories/PostRepository");
const SuccessHandler_1 = require("../../../utils/SuccessHandler");
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
class getMyPosts {
    postRepo = new PostRepository_1.PostRepo();
    async getMyPosts(req, res, next) {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                throw new ErrorTypes_1.NotFoundExceptions('userId not found');
            }
            const page = Math.max(1, parseInt(req.query.page)) || 1;
            const limit = 10;
            const MyPosts = await this.postRepo.getMyPosts(userId, page, limit);
            return (0, SuccessHandler_1.SuccessHandler)({
                res,
                msg: 'user posts are fetched',
                data: { MyPosts },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.getMyPosts = getMyPosts;
