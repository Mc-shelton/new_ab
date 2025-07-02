"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const oAuth2Client = new google_auth_library_1.OAuth2Client('appConfig.google.CLIENT_ID', 'appConfig.google.CLIENT_SECRET', 'appConfig.google.SSO_REDIRECT');
exports.default = oAuth2Client;
