"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmEmailSchema = void 0;
const zod_1 = require("zod");
exports.ConfirmEmailSchema = zod_1.z.object({
    email: zod_1.z.email(),
    otp: zod_1.z.string().length(6)
});
