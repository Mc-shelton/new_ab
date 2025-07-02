"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailError extends Error {
    constructor() {
        let message = 'failed to send email, check if email is valid';
        super(message);
    }
}
exports.default = EmailError;
