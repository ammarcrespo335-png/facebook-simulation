"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z
    .object({
    F_NAME: zod_1.z.string().trim(),
    L_NAME: zod_1.z.string().trim(),
    Age: zod_1.z.number().optional(),
    Phone: zod_1.z
        .string()
        .regex(/^\d{11}$/, 'Phone number must be exactly 11 digits')
        .trim(),
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid domain')
        .trim(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .trim(),
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
    const blacklistedDomains = [
        'tempmail.com',
        'mailinator.com',
        '10minutemail.com',
    ];
    if (args.email) {
        const domain = args.email.split('@')[1]?.toLowerCase();
        if (domain && blacklistedDomains.includes(domain)) {
            ctx.addIssue({
                code: 'custom',
                path: ['email'],
                message: 'This email domain is not allowed',
            });
        }
    }
});
