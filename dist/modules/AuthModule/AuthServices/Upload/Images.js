"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const SuccessHandler_1 = require("../../../../utils/SuccessHandler");
const s3_Services_1 = require("../../../../utils/multer/s3.Services");
const ErrorTypes_1 = require("../../../../utils/errors/ErrorTypes");
class ImagesController {
    uploadProfileImage = async (req, res, next) => {
        if (!req.file) {
            throw new ErrorTypes_1.CAppError('Profile image is required', 400);
        }
        const user = res.locals.user;
        const uploaded = await (0, s3_Services_1.UploadFile)({
            file: req.file,
            path: `${user._id}/profileImage`,
        });
        user.ProfileImage = uploaded.url;
        await user.save();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            msg: 'Profile image uploaded successfully',
        });
    };
    uploadCoverImage = async (req, res, next) => {
        const files = req.files;
        if (!files || files.length === 0) {
            throw new ErrorTypes_1.CAppError('At least one cover image is required', 400);
        }
        const user = res.locals.user;
        const uploaded = await Promise.all(files.map(file => (0, s3_Services_1.UploadFile)({
            file,
            path: `${user._id}/coverImage`,
        })));
        const uploadedUrls = uploaded.map(u => u.url);
        user.CoverImages = [...(user.CoverImages || []), ...uploadedUrls];
        await user.save();
        return (0, SuccessHandler_1.SuccessHandler)({
            res,
            msg: 'Cover images uploaded successfully',
            data: { uploadedUrls },
        });
    };
}
exports.ImagesController = ImagesController;
