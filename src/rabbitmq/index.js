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
exports.consumeMessageWithResponse = exports.sendMessageWithResponse = void 0;
const callback_api_1 = require("amqplib/callback_api");
const assertions_1 = require("./assertions");
function sendMessageWithResponse(queue, message) {
    return new Promise((resolve, reject) => {
        (0, callback_api_1.connect)('amqp://be.uat.opencapital.com', (error0, connection) => {
            if (error0) {
                reject(error0);
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    reject(error1);
                }
                (0, assertions_1.assertQueue)(channel, queue)
                    .then(() => {
                    channel.assertQueue('', { exclusive: true }, (error2, q) => {
                        if (error2) {
                            reject(error2);
                        }
                        const correlationId = generateUuid();
                        channel.consume(q.queue, (msg) => {
                            if (msg.properties.correlationId === correlationId) {
                                resolve(msg.content.toString());
                            }
                        }, { noAck: true });
                        channel.sendToQueue(queue, Buffer.from(message), { correlationId, replyTo: q.queue });
                    });
                })
                    .catch(reject);
            });
        });
    });
}
exports.sendMessageWithResponse = sendMessageWithResponse;
function consumeMessageWithResponse(queue, processMessage) {
    (0, callback_api_1.connect)('amqp://be.uat.opencapital.com', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            (0, assertions_1.assertQueue)(channel, queue)
                .then(() => {
                channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg !== null) {
                        const response = yield processMessage(msg.content.toString());
                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(response), { correlationId: msg.properties.correlationId });
                    }
                }), { noAck: true });
                console.log(" [*] Waiting for messages. To exit press CTRL+C");
            })
                .catch(console.error);
        });
    });
}
exports.consumeMessageWithResponse = consumeMessageWithResponse;
function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}
