"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomiz_1 = __importDefault(require("../utils/randomiz"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../../startup/logger"));
const config_ts_1 = __importDefault(require("../../config.ts"));
const logger = new logger_1.default('file picker - file persistor');
class FileHandler {
    constructor() {
        this.path = config_ts_1.default.app.FILE_PATH;
    }
    filePersistor(tempName, file, filePath) {
        const encName = (0, randomiz_1.default)(8);
        const fileName = `${encName}_${tempName}`;
        try {
            fs_1.default.writeFile(`${this.path}/${filePath}/${fileName}.png`, file, 'base64', (err) => {
                console.log(err);
                if (err)
                    throw new Error("failed saving image");
            });
            return fileName + '.png';
        }
        catch (err) {
            logger.genError(err.message);
            console.log(err);
            return null;
        }
    }
    deleteFile(name) {
        fs_1.default.unlink(`${this.path}/${name}`, (err) => {
            if (err)
                logger.genError(err.message);
            // if(err) throw new Error('failed deleting file')
        });
        return;
    }
}
exports.default = FileHandler;
