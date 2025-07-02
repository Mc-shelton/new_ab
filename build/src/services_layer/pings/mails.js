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
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const templates_1 = require("./templates");
const logger_1 = __importDefault(require("../../startup/logger"));
const logger = new logger_1.default('mail service layer');
const transporter = nodemailer_1.default.createTransport({
    host: 'mail.adventband.org',
    name: 'Advent Band',
    port: 465,
    secure: true,
    auth: {
        user: 'app@adventband.org',
        pass: "app@AdventBand"
    }
});
exports.transporter = transporter;
const mail = ({ subject, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'Advent Band <app@adventband.org>',
        to: data.email,
        subject: 'ADVENT BAND NOTIFICATIONS - ' + subject,
        html: (0, templates_1.joinerHtml)(data),
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            return logger.genError('error sending mail', err.message);
        console.log("message sent successfuly", info);
    });
});
exports.default = mail;
