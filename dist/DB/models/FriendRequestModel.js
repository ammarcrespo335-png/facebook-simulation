"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestModel = void 0;
const mongoose_1 = require("mongoose");
const FriendRequestSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
    },
    acceptedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.FriendRequestModel = (0, mongoose_1.model)('FriendRequest', FriendRequestSchema);
