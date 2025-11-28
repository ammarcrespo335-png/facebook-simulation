"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpService = void 0;
const ErrorTypes_1 = require("../../../utils/errors/ErrorTypes");
const UserRepo_1 = require("../../../DB/Repos/UserRepo");
const Hash_1 = require("../../../utils/Security/Hash");
const SuccessHanlder_1 = require("../../../utils/SuccessHanlder");
class SignUpService {
    userRepo = new UserRepo_1.UserRepo();
    signUp = async (req, res, next) => {
        const { F_NAME, L_NAME, Age, email, password, Phone } = req.body;
        const IsEmailExist = await this.userRepo.findByEmail({ email });
        if (IsEmailExist) {
            throw new ErrorTypes_1.CAppError('email is already exist ', 409);
        }
        const user = await this.userRepo.create({
            data: {
                F_NAME,
                L_NAME,
                Phone,
                Age: Age,
                email,
                password: await (0, Hash_1.hash)(password),
            },
        });
        if (!user) {
            throw new ErrorTypes_1.CAppError('User could not be created', 500);
        }
        return (0, SuccessHanlder_1.SuccessHandler)({
            res,
            data: user,
            msg: 'user created successfully ',
        });
    };
}
exports.SignUpService = SignUpService;
