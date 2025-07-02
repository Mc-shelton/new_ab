"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyFieldError extends Error {
    constructor(object) {
        let message = 'payload missing values : ';
        for (let key in object) {
            const ikey = key;
            if (!object[ikey])
                message + key + ", ";
        }
        super(message);
    }
}
exports.default = EmptyFieldError;
