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
exports.registerServer = void 0;
const os_1 = __importDefault(require("os"));
const config_ts_1 = __importDefault(require("../config.ts"));
const axios_1 = __importDefault(require("axios"));
const encryption_1 = require("../encryption");
const logger_1 = __importDefault(require("./logger"));
const logger = new logger_1.default('register ip');
function registerServer(count) {
    return __awaiter(this, void 0, void 0, function* () {
        let counter = count || 0;
        const interfaces = os_1.default.networkInterfaces();
        const addresses = [];
        for (const key in interfaces) {
            //@ts-ignore
            for (const iface of interfaces[key]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    addresses.push(iface.address);
                }
            }
        }
        logger.genLog('server addresses : ', addresses);
        const regPayLoad = {
            name: 'AUTH_SERVICE',
            port: parseInt(config_ts_1.default.app.PORT),
            status: true,
            host: addresses[1],
            url: `http://${addresses[1]}:${config_ts_1.default.app.PORT}`,
            timeStamp: ''
        };
        axios_1.default.post(config_ts_1.default.app.GATE_WAY_ENDPOINT + "/register", regPayLoad, { headers: {
                "www-auth-challenge": "Digest",
                "www-auth-hash": "Digest"
            } }).then((res) => {
            if (res.status === 201 && res.data.message === 'www challenge') {
                //combat challenge
                let challenge_cypher = res.headers['www-auth-challenge'];
                let challenge = (0, encryption_1.decrypt)(challenge_cypher);
                let split_challenge = challenge.split("|");
                let challenge_Date = split_challenge[0].trim();
                let challenge_hex = split_challenge[1].trim();
                let hash = (0, encryption_1.hashChallenge)(config_ts_1.default.app.CRYPTO_SECRET, challenge);
                regPayLoad.timeStamp = challenge_Date;
                axios_1.default.post(config_ts_1.default.app.GATE_WAY_ENDPOINT + "/register", regPayLoad, { headers: {
                        "www-auth-challenge": "Digest " + challenge_cypher,
                        "www-auth-hash": "Digest " + hash
                    } }).then((res) => {
                    console.log(res.data, challenge_hex);
                }).catch((err) => {
                    console.log('error', err);
                    if (err.response.status === 400) {
                        if (counter > 3) {
                            //send mail
                            logger.genError('terminating server, registering retry exeeded 3');
                            return;
                        }
                        setTimeout(() => {
                            logger.genLog('could not register server, error 400. retrying index :', counter);
                            counter = counter + 1;
                            registerServer(counter);
                        }, 1000);
                    }
                    else if (err.response.status === 500) {
                        //send server error mail
                        logger.genError('terminating server, gateway returned 500');
                    }
                    else {
                        logger.genError('could not register server...gateway offline');
                    }
                });
            }
        }).catch((err) => {
            var _a;
            if (err.code === 'ECONNREFUSED') {
                logger.genError('terminating server, gateway refused to connect');
                return;
            }
            else if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                const data = err.response.data;
                logger.genError('terminating server, error in service program ');
                return;
                //recursion here if message is normal error
            }
            else {
                logger.genError("could not register server...gateway offline");
            }
        });
        config_ts_1.default.app.HOST = addresses[0];
        // appConfig.app.BASE_URL = `${addresses[0]}:${appConfig.app.PORT}/${appConfig.app.API_VERSION}`
    });
}
exports.registerServer = registerServer;
