"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const config_ts_1 = __importDefault(require("../../config.ts"));
const oAuth2Client = new google_auth_library_1.OAuth2Client(config_ts_1.default.google.CLIENT_ID, config_ts_1.default.google.CLIENT_SECRET, config_ts_1.default.google.SSO_REDIRECT);
exports.default = oAuth2Client;
