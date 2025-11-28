"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const S3 = () => {
    return new client_s3_1.S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AccesskeyID,
            secretAccessKey: process.env.SecretAccesskey,
        },
    });
};
exports.S3 = S3;
