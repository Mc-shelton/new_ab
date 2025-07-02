"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const picker = (origin, pick) => {
    const picked = Object.create({});
    pick.forEach((d) => {
        picked[d] = origin[d];
    });
    return picked;
};
exports.default = picker;
