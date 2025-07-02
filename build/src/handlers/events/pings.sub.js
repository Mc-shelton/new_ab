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
const _1 = __importDefault(require("."));
const pings_1 = require("../../services_layer/pings");
const logger_1 = __importDefault(require("../../startup/logger"));
const ping_event = new _1.default();
const logger = new logger_1.default("ping events");
class PingMethods {
    sendCampMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = 'USER CREATED';
            try {
                yield (0, pings_1.mail)({ subject, data });
                logger.genLog("email sent");
            }
            catch (err) {
                logger.genError("failed to send email");
            }
        });
    }
}
const pingMethods = new PingMethods();
ping_event.on('send_mail', (d) => {
    pingMethods.sendCampMail(d);
});
ping_event.on('error', (e) => {
    logger.genError('an error occured at ping event', e);
});
exports.default = ping_event;
