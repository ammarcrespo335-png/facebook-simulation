"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    F_NAME: {
        type: String,
        required: true,
    },
    L_NAME: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
    },
    CoverImages: [String],
    ProfileImage: String,
    FolderID: String,
    VerificationEmailCode: {
        otp: {
            type: String,
        },
        expiredAt: {
            type: Date,
        },
    },
    fieldAttemptsCode: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    CodeBan: {
        type: Date,
        default: null,
    },
    EmailOtp: {
        otp: String,
        expiredAt: Date,
    },
    PasswordOtp: {
        otp: String,
        expiredAt: Date,
    },
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.models.users || (0, mongoose_1.model)('users', userSchema);
