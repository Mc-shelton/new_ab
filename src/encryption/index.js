"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.hashChallenge = exports.generateNonce = void 0;
const crypto = __importStar(require("crypto"));
const config_ts_1 = __importDefault(require("../config.ts"));
let IV = config_ts_1.default.app.IV;
const generateNonce = () => {
    const date = new Date().toUTCString();
    let hex = crypto.randomBytes(256).toString('hex');
    let nonce = `${date}:${hex}`;
    let challenge = encrypt(nonce);
    return { challenge, date };
};
exports.generateNonce = generateNonce;
const hashChallenge = (serviceSecrete, challenge) => {
    return crypto.createHash("sha256").update(`${serviceSecrete}:${challenge}`).digest('base64');
};
exports.hashChallenge = hashChallenge;
const genKey = () => {
    let secret = config_ts_1.default.app.SECRET;
    let salt = config_ts_1.default.app.SALT;
    const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha256');
    return key;
};
const encrypt = (data) => {
    const key = genKey();
    const cipher = crypto.createCipheriv('aes-256-cbc', key, IV);
    let encData = cipher.update(data, 'utf-8', 'hex');
    encData += cipher.final('hex');
    return encData;
};
exports.encrypt = encrypt;
const decrypt = (data) => {
    const key = genKey();
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, IV);
    let decData = decipher.update(data, 'hex', 'utf-8');
    decData += decipher.final('utf-8');
    return decData;
};
exports.decrypt = decrypt;
