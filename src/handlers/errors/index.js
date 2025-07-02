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
exports.customErrorChecker = exports.UniqueParam = exports.EmailError = exports.EmptyFieldError = exports.UserErrors = exports.InvalidQueryError = void 0;
const query_1 = __importDefault(require("./query"));
exports.InvalidQueryError = query_1.default;
const userErrors_1 = __importStar(require("./userErrors"));
exports.UserErrors = userErrors_1.default;
const emptyfields_1 = __importDefault(require("./emptyfields"));
exports.EmptyFieldError = emptyfields_1.default;
const idbrigde_1 = __importStar(require("./idbrigde"));
Object.defineProperty(exports, "UniqueParam", { enumerable: true, get: function () { return idbrigde_1.UniqueParam; } });
const library_1 = require("@prisma/client/runtime/library");
const emailError_1 = __importDefault(require("./emailError"));
exports.EmailError = emailError_1.default;
const customErrorChecker = (error) => {
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        error.message = 'constraint error';
    }
    return error instanceof idbrigde_1.UniqueParam || error instanceof userErrors_1.default || error instanceof userErrors_1.UsedEmail || error instanceof emptyfields_1.default || error instanceof emailError_1.default || error instanceof idbrigde_1.default || error instanceof library_1.PrismaClientKnownRequestError;
};
exports.customErrorChecker = customErrorChecker;
