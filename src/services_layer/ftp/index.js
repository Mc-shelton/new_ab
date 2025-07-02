"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToFtp = void 0;
const ftp = __importStar(require("basic-ftp"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../../startup/logger"));
const logger = new logger_1.default('FTP Loader');
/**
 * Upload a file to an FTP server
 * @param {string} host - FTP server hostname
 * @param {string} user - FTP username
 * @param {string} password - FTP password
 * @param {string} localFilePath - Path to the local file
 * @param {string} remoteFolder - Path on the FTP server to upload to
 */
function uploadToFtp(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { localPath, remoteFileName, remoteFolder } = input;
        const host = "adventband.org";
        const user = "bucket@adventband.org";
        const password = "mAjiMot00";
        const client = new ftp.Client();
        client.ftp.verbose = false;
        try {
            yield client.access({
                host,
                user,
                password,
                secure: false,
            });
            const remotePath = path_1.default.posix.join(remoteFolder, remoteFileName);
            logger.genLog(`Uploading ${remoteFileName} to ${host}${remoteFolder}...`);
            yield client.uploadFrom(localPath, remotePath);
            logger.genLog("Upload complete");
            return {
                success: true,
                url: `ftp://${host}${remotePath}`,
            };
        }
        catch (err) {
            console.error("FTP upload failed:", err.message);
            return {
                success: false,
                error: err.message,
            };
        }
        finally {
            client.close();
        }
    });
}
exports.uploadToFtp = uploadToFtp;
