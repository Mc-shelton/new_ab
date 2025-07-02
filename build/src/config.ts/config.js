"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// process.env.RAILWAY_ENVIRONMENT == 'production'? dotenv.config({path:'.env'}) : dotenv.config({path:'.env.development'})
console.log(process.env);
const config = (envString) => {
    const env = process.env[envString];
    if (!env)
        throw new Error(`Missing env : ${envString}`);
    return env;
};
exports.default = config;
