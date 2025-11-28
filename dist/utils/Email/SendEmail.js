"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendEmail = async ({ to, subject, html, }) => {
    const transporterOptions = {
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    };
    const transporter = nodemailer_1.default.createTransport(transporterOptions);
    const main = async () => {
        const info = await transporter.sendMail({
            from: `socialApp<${process.env.USER}>`,
            to,
            subject,
            html,
        });
    };
    main().catch(err => {
        console.log({ err });
    });
};
exports.SendEmail = SendEmail;
