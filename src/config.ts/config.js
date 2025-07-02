"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV == 'production' ? dotenv_1.default.config({ path: '.env' }) : dotenv_1.default.config({ path: '.env.development' });
console.log(process.env.NODE_ENV);
const config = (envString) => {
    const env = process.env[envString];
    if (!env)
        throw new Error(`Missing env : ${envString}`);
    return env;
};
exports.default = config;
