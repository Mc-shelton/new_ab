"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertQueue = void 0;
function assertQueue(channel, queue, options) {
    return new Promise((resolve, reject) => {
        channel.assertQueue(queue, options, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.assertQueue = assertQueue;
