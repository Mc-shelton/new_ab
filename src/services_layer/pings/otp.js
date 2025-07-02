"use strict";
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
exports.messageOtp = exports.mailOtp = void 0;
const templates_1 = require("./templates");
const mails_1 = require("./mails");
const logger_1 = __importDefault(require("../../startup/logger"));
const errors_1 = require("../../handlers/errors");
const logger = new logger_1.default('send mail otp');
const mailOtp = (data, email) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'Advent Band <app@adventband.org>',
        to: email,
        subject: 'ADVENT BAND NOTIFICATIONS - OTP',
        html: (0, templates_1.otpHtml)(data),
    };
    mails_1.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.genError('error sending mail', err.message);
            throw new errors_1.EmailError();
        }
        console.log("message sent successfuly", info);
    });
});
exports.mailOtp = mailOtp;
const messageOtp = () => {
    //message otp to phone
};
exports.messageOtp = messageOtp;
