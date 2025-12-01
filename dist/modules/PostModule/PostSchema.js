"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostSchema = exports.PostSchema = void 0;
const zod_1 = require("zod");
exports.PostSchema = zod_1.z.object({
    postId: zod_1.z
        .string()
        .min(1)
        .regex(/^[a-fA-F0-9]{24}$/, 'Invalid postId format'),
});
exports.CreatePostSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "content is required"),
    images: zod_1.z.array(zod_1.z.string()).optional(),
});
