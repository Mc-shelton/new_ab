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
const logger_1 = __importDefault(require("../../startup/logger"));
const config_ts_1 = __importDefault(require("../../config.ts"));
const types_1 = require("../types");
const auth_1 = __importDefault(require("../../services_layer/auth/auth"));
const logger = new logger_1.default("auth middleware");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization;
    const auth_key = req.headers["x-api-key"];
    console.log(req.url);
    try {
        if (auth_key != config_ts_1.default.app.API_KEY && !req.url.includes('auth') && !req.url.includes('static')) {
            return res.status(403).json({
                message: "invalid api key",
            });
        }
        if (!(bearer === null || bearer === void 0 ? void 0 : bearer.split("Bearer ")[1]))
            return next();
        const token = bearer === null || bearer === void 0 ? void 0 : bearer.split("Bearer ")[1].trim();
        if (!token)
            return res.status(403).json({
                message: "invalid bearer token",
            });
        const { status, message, user } = yield auth_1.default.verifyToken(token);
        if (status === false)
            return next();
        // let blackList = (await redisHandler.getter('BlackList')).data as unknown as TokenBlackList[]
        // let l = blackList.filter((l) => l.key === bearer)
        // if (l.length > 0) return res.status(403).json({ message: 'this user has been disabled or deleted' })
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(err.message);
    }
});
exports.default = authenticate;
