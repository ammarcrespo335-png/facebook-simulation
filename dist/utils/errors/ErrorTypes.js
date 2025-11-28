"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotVerifiedExceptions = exports.invalidTokenExceptions = exports.invalidCredentialsExceptions = exports.OtpExpiredExceptions = exports.invalidOtpExceptions = exports.invalidEmailExceptions = exports.NotFoundExceptions = exports.CAppError = void 0;
class CAppError extends Error {
    statusCode;
    constructor(msg, statusCode, options = {}) {
        super(msg, options);
        this.statusCode = statusCode;
    }
}
exports.CAppError = CAppError;
class NotFoundExceptions extends CAppError {
    constructor(msg) {
        super(msg, 404);
    }
}
exports.NotFoundExceptions = NotFoundExceptions;
class invalidEmailExceptions extends CAppError {
    constructor(msg) {
        super(msg, 404);
    }
}
exports.invalidEmailExceptions = invalidEmailExceptions;
class invalidOtpExceptions extends CAppError {
    constructor(msg) {
        super(msg, 404);
    }
}
exports.invalidOtpExceptions = invalidOtpExceptions;
class OtpExpiredExceptions extends CAppError {
    constructor(msg) {
        super(msg, 409);
    }
}
exports.OtpExpiredExceptions = OtpExpiredExceptions;
class invalidCredentialsExceptions extends CAppError {
    constructor(msg) {
        super(msg, 400);
    }
}
exports.invalidCredentialsExceptions = invalidCredentialsExceptions;
class invalidTokenExceptions extends CAppError {
    constructor(msg) {
        super('in-valid token', 400);
    }
}
exports.invalidTokenExceptions = invalidTokenExceptions;
class NotVerifiedExceptions extends CAppError {
    constructor(msg) {
        super('not verified', 400);
    }
}
exports.NotVerifiedExceptions = NotVerifiedExceptions;
