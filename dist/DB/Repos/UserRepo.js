"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const DBRepo_1 = require("../DBRepo");
const UserModel_1 = require("../models/UserModel");
class UserRepo extends DBRepo_1.DBRepo {
    constructor() {
        super(UserModel_1.UserModel);
    }
    findByEmail = async ({ email, Projection = {}, options = {}, }) => {
        const doc = await this.model.findOne({ email }, Projection, options);
        return doc;
    };
}
exports.UserRepo = UserRepo;
