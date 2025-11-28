"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessHandler = void 0;
const SuccessHandler = ({ res, data = {}, status = 201, msg = 'Done', }) => {
    return res.status(status).json({ msg, data });
};
exports.SuccessHandler = SuccessHandler;
