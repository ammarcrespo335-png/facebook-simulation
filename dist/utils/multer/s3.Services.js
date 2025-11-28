"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = require("./multer");
const fs_1 = require("fs");
const s3_config_1 = require("./s3.config");
const UploadFile = async ({ storeIn = multer_1.StoreInEnum.memory, Bucket = process.env.BUCKET_NAME, ACL = 'private', path = 'general', file, }) => {
    const Key = `${process.env.APP_NAME}/${path}/${Date.now()}_${file.originalname}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket,
        ACL,
        Key: Key,
        Body: storeIn == multer_1.StoreInEnum.memory ? file.buffer : (0, fs_1.createReadStream)(file.path),
        ContentType: file.mimetype,
    });
    const result = await (0, s3_config_1.S3)().send(command);
    return {
        result,
        url: `https://${Bucket}.s3.${process.env.REGION}.amazonaws.com/${Key}`,
    };
};
exports.UploadFile = UploadFile;
