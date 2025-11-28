"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const UserRepository_1 = require("../UserRepository");
const UserModel_1 = require("../models/UserModel");
class UserRepo extends UserRepository_1.DBRepo {
    constructor() {
        super(UserModel_1.UserModel);
    }
    findByEmail = async ({ email, Projection = {}, options = {}, }) => {
        const doc = await this.model.findOne({ email }, Projection, options);
        return doc;
    };
}
exports.UserRepo = UserRepo;
