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
const startup_1 = __importDefault(require("../../redis/startup"));
const logger_1 = __importDefault(require("../../startup/logger"));
const repositories_1 = require("../repositories");
const black_list_event = new _1.default();
const logger = new logger_1.default('black list events');
class BlackListMethods {
    addBlackList(phone, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield repositories_1.startUpRepository.addBlackList(phone, token);
                (0, startup_1.default)();
                logger.genLog('updated blacklist successfuly');
            }
            catch (err) {
                logger.genError('failed at updating blacklist');
            }
        });
    }
}
const blackListMethods = new BlackListMethods();
black_list_event.on('add_to_list', (p, t) => {
    blackListMethods.addBlackList(p, t);
    console.log('this one worked');
});
black_list_event.on('error', (e) => {
    logger.genError('an error occured at balcklist event', e);
});
exports.default = black_list_event;
