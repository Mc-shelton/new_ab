"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaSetup = void 0;
const prisma_1 = require("../prisma");
const logger_1 = __importDefault(require("./logger"));
const logger = new logger_1.default('db setup');
const prismaSetup = () => __awaiter(void 0, void 0, void 0, function* () {
    prisma_1.prismaClient.$connect().then(() => {
        logger.genLog('connnected to db');
    }).catch(() => {
        throw new Error('failed to connect to db');
    });
});
exports.prismaSetup = prismaSetup;
