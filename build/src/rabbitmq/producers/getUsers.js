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
exports.produceMessageAndGetResponse = void 0;
const __1 = require("..");
function produceMessageAndGetResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = 'postUser';
        const message = 'Hello, RabbitMQ!';
        const response = yield (0, __1.sendMessageWithResponse)(queue, message);
        console.log(" [x] Received response:", response);
    });
}
exports.produceMessageAndGetResponse = produceMessageAndGetResponse;
