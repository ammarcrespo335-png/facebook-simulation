"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestRepo = void 0;
const UserRepository_1 = require("./UserRepository");
const FriendRequestModel_1 = require("../models/FriendRequestModel");
class FriendRequestRepo extends UserRepository_1.DBRepo {
    model;
    constructor(model = FriendRequestModel_1.FriendRequestModel) {
        super(FriendRequestModel_1.FriendRequestModel);
        this.model = model;
    }
}
exports.FriendRequestRepo = FriendRequestRepo;
