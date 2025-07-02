"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorEnums = exports.statusEnums = void 0;
const statusEnums = {
    TRUTHY: 200,
    TRUE: 201,
    FALSE: 404
};
exports.statusEnums = statusEnums;
const errorEnums = {
    SERVER: 'internal server error. try again later',
    FIELDS: 'you must provid all the fields',
    PROFILE: "You are not authorized to access this resource"
};
exports.errorEnums = errorEnums;
