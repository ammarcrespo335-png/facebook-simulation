"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestRepo = void 0;
const DBRepository_1 = require("./DBRepository");
const FriendRequestModel_1 = require("../models/FriendRequestModel");
class FriendRequestRepo extends DBRepository_1.DBRepo {
    model;
    constructor(model = FriendRequestModel_1.FriendRequestModel) {
        super(FriendRequestModel_1.FriendRequestModel);
        this.model = model;
    }
}
exports.FriendRequestRepo = FriendRequestRepo;
