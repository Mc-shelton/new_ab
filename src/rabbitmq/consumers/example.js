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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApprovalMails = exports.getUsersConsumer = void 0;
const __1 = require("..");
const services_1 = require("../../handlers/services");
function getUsersConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = 'user_by_id';
        (0, __1.consumeMessageWithResponse)(queue, (message) => __awaiter(this, void 0, void 0, function* () {
            // Process message and return response
            const m = JSON.parse(message);
            let user = yield services_1.userService.getUser(m);
            console.log('here is what i got ', message);
            return JSON.stringify(user);
        }));
    });
}
exports.getUsersConsumer = getUsersConsumer;
function getApprovalMails() {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = 'app_by_id';
        (0, __1.consumeMessageWithResponse)(queue, (message) => __awaiter(this, void 0, void 0, function* () {
            // Process message and return response
            const m = JSON.parse(message);
            let user = yield services_1.userService.getUser(m);
            console.log('here is what i got ', message);
            return JSON.stringify(user);
        }));
    });
}
exports.getApprovalMails = getApprovalMails;
