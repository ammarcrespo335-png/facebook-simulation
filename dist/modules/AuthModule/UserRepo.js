"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
class UserRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    findByEmail = async ({ email, Projection = {}, options = {}, }) => {
        const doc = await this.model.findOne({ email }, Projection, options);
        return doc;
    };
}
exports.UserRepo = UserRepo;
