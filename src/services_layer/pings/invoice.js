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
exports.receivedMail = exports.mail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("../../startup/logger"));
const templates_1 = require("./templates");
const fs_1 = __importDefault(require("fs"));
const logger = new logger_1.default('mail service layer');
const transporter = nodemailer_1.default.createTransport({
    host: 'webmail.adventband.org',
    name: 'AHC Shops & Services',
    port: 465,
    secure: true,
    auth: {
        user: 'sales@adventband.org',
        pass: 'sales@Shellton'
    },
    tls: {
        // Do not fail on invalid certs (if necessary)
        rejectUnauthorized: false,
        // The certificates
        key: fs_1.default.readFileSync('./ssl/key.pem'),
        cert: fs_1.default.readFileSync('./ssl/certificate.pem'),
    }
});
exports.transporter = transporter;
const mail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(data)
    const mailOptions = {
        from: 'AHC Shops & Services <sales@adventband.org>',
        to: data.customer_email,
        subject: 'AHC - ORDER CONFIRMED - INVOICE',
        html: (0, templates_1.invoiceHtml)(data),
        cc: ['sales@adventband.org', 'somondi@adventband.org']
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            return logger.genError('error sending mail', err.message);
        console.log("message sent successfuly");
    });
});
exports.mail = mail;
const receivedMail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'AHC Shops & Services <sales@adventband.org>',
        to: data.customer_email,
        subject: 'AHC - ORDER RECEIVED',
        html: (0, templates_1.receivedHtml)(data),
        cc: ['sales@adventband.org', 'somondi@adventband.org']
    };
    transporter.sendMail(mailOptions, (err, info) => {
        // console.log(data)
        if (err)
            return logger.genError('error sending mail', err.message);
        console.log("message sent successfuly");
    });
});
exports.receivedMail = receivedMail;
