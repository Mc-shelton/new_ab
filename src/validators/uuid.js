"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUUID = (string) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;
    return uuidPattern.test(string);
};
exports.default = validateUUID;
