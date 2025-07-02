"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidQueryError extends Error {
    constructor(queryType, query) {
        super(`${queryType} query for query : ${query} is invalid or wrong`);
    }
}
exports.default = InvalidQueryError;
