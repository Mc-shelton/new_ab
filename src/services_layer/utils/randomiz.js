"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const randomiz = (n) => {
    const buf = (0, crypto_1.randomBytes)(n);
    return buf.toString('hex');
};
exports.default = randomiz;
