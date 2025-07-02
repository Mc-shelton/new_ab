"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSchema = exports.otpSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    phone: joi_1.default.string().regex(/^\+254\d{9}$/).messages({
        'string.pattern.base': 'invalid phone number'
    }),
    name: joi_1.default.string().messages({
        'string.pattern.base': 'invalid user name'
    }),
    email: joi_1.default.string().email().messages({
        'string.pattern.base': 'invalid email address'
    }),
    image: joi_1.default.string().messages({
        'string.pattern.base': 'invalid user image'
    }),
});
exports.userSchema = userSchema;
const otpSchema = joi_1.default.string().messages({
    'string.pattern.base': 'invalid phone number'
});
exports.otpSchema = otpSchema;
const phoneSchema = joi_1.default.string().regex(/^\+254\d{9}$/).messages({
    'string.pattern.base': 'invalid phone number'
});
exports.phoneSchema = phoneSchema;
