"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'post', required: true },
    CreatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'users' }],
}, {
    timestamps: true,
});
exports.CommentModel = (0, mongoose_1.model)('comment', CommentSchema);
