"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const appMap = () => {
    return ({
        app: {
            NODE_ENV: (0, config_1.default)("NODE_ENV"),
            PORT: (0, config_1.default)('PORT'),
            API_KEY: (0, config_1.default)('API_KEY'),
            FILE_PATH: (0, config_1.default)('FILE_PATH'),
            HOST: '',
            BASE_URL: (0, config_1.default)('BASE_URL'),
            API_VERSION: (0, config_1.default)('API_VERSION'),
            GATE_WAY_ENDPOINT: (0, config_1.default)('GATE_WAY_ENDPOINT'),
            SECRET: (0, config_1.default)('CRYPTO_SECRET'),
            SALT: (0, config_1.default)('SALT'),
            REDIS_HOST: (0, config_1.default)('REDIS_HOST'),
            CRYPTO_SECRET: (0, config_1.default)('CRYPTO_SECRET'),
            IV: (0, config_1.default)('IV')
        },
        jwt: {
            SECRET: (0, config_1.default)('SECRET')
        },
        crypto: {
            CRYPTO_SECRET: (0, config_1.default)('CRYPTO_SECRET'),
            SALT: (0, config_1.default)('SALT'),
            hashALGORITHM: (0, config_1.default)('hashALGORITHM'),
            encALGORITHM: (0, config_1.default)('encALGORITHM')
        },
        mailer: {
            MAIL_PORT: (0, config_1.default)("MAIL_PORT"),
            MAIL_HOST: (0, config_1.default)("MAIL_HOST"),
            MAIL_USER: (0, config_1.default)("MAIL_USER"),
            MAIL_PASS: (0, config_1.default)('MAIL_PASS'),
            TEMPLATE_SRC: (0, config_1.default)('TEMPLATE_SRC')
        }
    });
};
const appConfig = appMap();
exports.default = appConfig;
