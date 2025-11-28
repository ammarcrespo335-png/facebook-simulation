"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseHooks = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const UserRepo_1 = require("../../../../DB/Repos/UserRepo");
class MongooseHooks {
    UserModel = new UserRepo_1.UserRepo();
    TestHooks = async (req, res, next) => {
        const data = await this.UserModel.find({});
        return (0, SuccessHandler_1.SuccessHandler)({ res, data });
    };
}
exports.MongooseHooks = MongooseHooks;
