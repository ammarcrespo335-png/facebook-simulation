"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentSchema = void 0;
const zod_1 = require("zod");
exports.CreateCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
    postId: zod_1.z
        .string()
        .min(1)
        .regex(/^[a-fA-F0-9]{24}$/, 'Invalid postId format'),
});
