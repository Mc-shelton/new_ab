"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = exports.getTime = void 0;
const getDate = (l) => {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    let month = monthNames[l.getMonth()];
    let date = l.getDate();
    let year = l.getFullYear();
    return `${month} ${date} ${year}`;
};
exports.getDate = getDate;
const getTime = (l) => {
    const time = l.getHours();
    const p = time >= 12 ? 'PM' : 'AM';
    const fh = time % 12 || 12;
    const min = l.getMinutes();
    return `${fh}:${min} ${p}`;
};
exports.getTime = getTime;
