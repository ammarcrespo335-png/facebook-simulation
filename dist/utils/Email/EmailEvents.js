"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEmitter = exports.EVENTS_FOR_EMAIL = exports.EMAIL_EVENTS_ENUM = void 0;
const events_1 = require("events");
const SendEmail_1 = require("./SendEmail");
var EMAIL_EVENTS_ENUM;
(function (EMAIL_EVENTS_ENUM) {
    EMAIL_EVENTS_ENUM["Verify_Email"] = "VERIFY EMAIL";
    EMAIL_EVENTS_ENUM["Reset_Password"] = "RESET PASSWORD";
})(EMAIL_EVENTS_ENUM || (exports.EMAIL_EVENTS_ENUM = EMAIL_EVENTS_ENUM = {}));
class EVENTS_FOR_EMAIL {
    emitter;
    constructor(emitter) {
        this.emitter = emitter;
    }
    subscribe = (event, callback) => {
        this.emitter.on(event, callback);
    };
    publish = (event, payLoad) => {
        this.emitter.emit(event, payLoad);
    };
}
exports.EVENTS_FOR_EMAIL = EVENTS_FOR_EMAIL;
const emitter = new events_1.EventEmitter();
exports.emailEmitter = new EVENTS_FOR_EMAIL(emitter);
exports.emailEmitter.subscribe(EMAIL_EVENTS_ENUM.Verify_Email, ({ to, subject, html }) => {
    (0, SendEmail_1.SendEmail)({ to, subject, html });
});
exports.emailEmitter.subscribe(EMAIL_EVENTS_ENUM.Reset_Password, ({ to, subject, html }) => {
    (0, SendEmail_1.SendEmail)({ to, subject, html });
});
