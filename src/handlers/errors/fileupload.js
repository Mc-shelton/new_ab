"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileUploadError extends Error {
    constructor(tier, type, fileName) {
        const tiering = tier == 'DELETE' ? 'delet' : 'upload';
        const typeing = type == 'IMAGE' ? 'image(s)' : 'file(s)';
        super(`failed to ${tiering} ${typeing}, ${fileName}`);
    }
}
exports.default = FileUploadError;
