"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim(),
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid domain').trim(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters').trim(),
    confirmPassword: zod_1.z.string().trim(),
})
    .superRefine((args, ctx) => {
    if (args.confirmPassword != args.password) {
        ctx.addIssue({
            code: 'custom',
            path: ['password', 'confirmPassword'],
            message: 'confirmPassword must be equal password ',
        });
    }
});
