"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpService = void 0;
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const UserRepo_1 = require("../../../DB/Repos/UserRepo");
const Hash_1 = require("../../../utils/Security/Hash");
class SignUpService {
    userRepo = new UserRepo_1.UserRepo();
    signUp = async (req, res, next) => {
        const { name, email, password } = req.body;
        const IsEmailExist = await this.userRepo.findByEmail({ email });
        if (IsEmailExist) {
            throw new ErrorTypes_1.CAppError('email is already exist ', 409);
        }
        const user = await this.userRepo.create({
            data: { name, email, password: await (0, Hash_1.hash)(password) }
        });
        return res.json({ user });
    };
}
exports.SignUpService = SignUpService;
