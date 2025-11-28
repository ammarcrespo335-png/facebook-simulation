"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImageController = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const s3_Services_1 = require("../../../../utils/multer/s3.Services");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
class ProfileImageController {
    uploadProfileImage = async (req, res, next) => {
        if (!req.file) {
            throw new ErrorTypes_1.CAppError('Profile image is required', 400);
        }
        const file = req.file;
        const user = res.locals.user;
        const uploaded = await (0, s3_Services_1.UploadFile)({
            file,
            path: `${user._id}/profileImage`,
        });
        user.ProfileImage = uploaded.url;
        await user.save();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            msg: 'profile Image uploaded successfully',
        });
    };
}
exports.ProfileImageController = ProfileImageController;
