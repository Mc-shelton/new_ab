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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./src/startup/logger"));
const config_ts_1 = __importDefault(require("./src/config.ts"));
const db_1 = require("./src/startup/db");
const router_1 = require("./src/startup/router");
const fs_1 = __importDefault(require("fs"));
const socket_1 = __importDefault(require("./src/startup/socket"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
// import './src/BFF/misc/convert_to_mp3'
const app = (0, express_1.default)();
const logger = new logger_1.default('index');
const PORT = config_ts_1.default.app.PORT;
const sslKey = fs_1.default.readFileSync('./ssl/key.pem');
const sslCrt = fs_1.default.readFileSync("./ssl/certificate.pem");
(0, router_1.routerSetup)(app);
logger.unCought();
const server = http_1.default.createServer(app);
(0, socket_1.default)(server);
// logger.unCought()
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, db_1.prismaSetup)();
    logger.genLog('app listening on port', PORT, 'SERVER', 'LOG');
    const remoteFileName = path_1.default.basename('./2.png');
}));
