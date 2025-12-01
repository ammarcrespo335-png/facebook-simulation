"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PostSchema = new mongoose_1.Schema({
    CreatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    isFrozen: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.PostModel = (0, mongoose_1.model)('posts', exports.PostSchema);
