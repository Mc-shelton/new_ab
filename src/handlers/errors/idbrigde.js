"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueParam = void 0;
class BridgeError extends Error {
    constructor(item) {
        super(`bad request. ${item} does not exist`);
    }
}
class UniqueParam extends Error {
    constructor(query, param, value) {
        super(`bad request. a ${query} of ${param} : ${value} already exists`);
    }
}
exports.UniqueParam = UniqueParam;
exports.default = BridgeError;
