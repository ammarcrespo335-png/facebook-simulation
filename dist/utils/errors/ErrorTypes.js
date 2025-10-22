"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAppError = void 0;
class CAppError extends Error {
    statusCode;
    constructor(msg, statusCode, options = {}) {
        super(msg, options);
        this.statusCode = statusCode;
    }
}
exports.CAppError = CAppError;
