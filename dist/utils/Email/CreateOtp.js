"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOtp = void 0;
const nanoid_1 = require("nanoid");
const createOtp = () => {
    const code = (0, nanoid_1.customAlphabet)('0123456789')(6);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    return { code, expiresAt };
};
exports.createOtp = createOtp;
