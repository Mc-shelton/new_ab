"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syncObjectUpdate = (origin, object) => {
    if (!(origin instanceof Object) || !(object instanceof Object))
        throw new Error('payload must be object');
    const originCopy = Object.assign({}, origin);
    for (const key in object) {
        const k = key;
        if (originCopy.hasOwnProperty(k) && (object[k] !== undefined && object[k] !== null)) {
            originCopy[k] = object[k];
        }
    }
    return originCopy;
};
exports.default = syncObjectUpdate;
