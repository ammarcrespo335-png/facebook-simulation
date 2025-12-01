"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepo = void 0;
const DBRepository_1 = require("./DBRepository");
const PostModels_1 = require("../models/PostModels");
class PostRepo extends DBRepository_1.DBRepo {
    constructor() {
        super(PostModels_1.PostModel);
    }
    async getAllPosts(page, limit) {
        const skip = (page - 1) * limit;
        return this.model
            .find()
            .populate('CreatedBy', 'F_NAME L_NAME profileImage')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }
    async getSinglePost(id) {
        return this.model.findById(id).populate('CreatedBy', 'F_NAME L_NAME');
    }
    async updatePost(postId, userId, data) {
        return this.model.findOneAndUpdate({ _id: postId, CreatedBy: userId }, { $set: data }, { new: true });
    }
    async deletePost(postId, userId) {
        return PostModels_1.PostModel.findOneAndDelete({
            _id: postId,
            CreatedBy: userId,
        });
    }
    async getMyPosts(userId, page, limit) {
        const skip = (page - 1) * limit;
        return this.model
            .find({ CreatedBy: userId })
            .populate('CreatedBy', 'F_NAME L_NAME profileImage')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }
}
exports.PostRepo = PostRepo;
