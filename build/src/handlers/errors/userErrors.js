"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsedEmail = void 0;
class UserErrors extends Error {
    constructor(message) {
        super(`${message} : not a user, or wrong credetials`);
    }
}
class UsedEmail extends Error {
    constructor(email) {
        super(`Failed creating user : ${email} already taken `);
    }
}
exports.UsedEmail = UsedEmail;
exports.default = UserErrors;
