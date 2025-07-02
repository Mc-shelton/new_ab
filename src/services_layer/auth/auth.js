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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../../handlers/services");
const errors_1 = require("../../handlers/errors");
const config_ts_1 = __importDefault(require("../../config.ts"));
const repositories_1 = require("../../handlers/repositories");
class AuthLayer {
    constructor() {
        this.key = config_ts_1.default.jwt.SECRET;
    }
    signToken(p) {
        console.log('we went till here', p);
        const token = jsonwebtoken_1.default.sign(p, this.key, { expiresIn: '7d' });
        console.log('we went till here after isgn');
        return token;
    }
    verifyToken(t) {
        return __awaiter(this, void 0, void 0, function* () {
            let jReturn = {
                status: false
            };
            try {
                const verify = jsonwebtoken_1.default.verify(t, this.key);
                const user = yield services_1.userService.getUser(verify.id);
                if (!user)
                    throw new errors_1.UserErrors(verify.id);
                jReturn = {
                    status: true,
                    user
                };
            }
            catch (err) {
                jReturn = { status: false, message: err.message };
            }
            return jReturn;
        });
    }
    decodeToken(t) {
        return __awaiter(this, void 0, void 0, function* () {
            let jReturn = {
                status: false
            };
            try {
                const verify = jsonwebtoken_1.default.decode(t);
                let user;
                user = yield repositories_1.userRepository.getUser(verify.sub);
                if (!user) {
                    const userModel = {
                        email: verify.email,
                        name: verify.sub,
                        phone: null
                    };
                    user = yield repositories_1.userRepository.createUser(userModel);
                }
                jReturn = {
                    status: true,
                    user
                };
            }
            catch (err) {
                jReturn = { status: false, message: err.message };
            }
            return jReturn;
        });
    }
}
const authLayer = new AuthLayer();
exports.default = authLayer;
