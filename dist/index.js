"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const bootstrap_1 = require("./bootstrap");
const Routes_1 = __importDefault(require("./modules/Routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', Routes_1.default);
(0, bootstrap_1.bootstrap)();
