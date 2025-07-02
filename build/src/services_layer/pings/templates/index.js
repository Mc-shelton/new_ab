"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receivedHtml = exports.otpHtml = exports.joinerHtml = exports.invoiceHtml = void 0;
const fs_1 = __importDefault(require("fs"));
const config_ts_1 = __importDefault(require("../../../config.ts"));
const handlebars_1 = __importDefault(require("handlebars"));
const tempPath = config_ts_1.default.mailer.TEMPLATE_SRC;
const joinerPath = `${tempPath}joiner_.hbs`;
const otpPath = tempPath + 'otp.hbs';
const invoicePath = `${tempPath}invoice.hbs`;
const receivedPath = `${tempPath}recieved.hbs`;
const joinerTemplateSource = fs_1.default.readFileSync(joinerPath, 'utf8');
const otpTemplateSource = fs_1.default.readFileSync(otpPath, 'utf8');
const invoiceTempSource = fs_1.default.readFileSync(invoicePath, 'utf8');
const receivedTempSource = fs_1.default.readFileSync(receivedPath, 'utf8');
const joinerTemplate = handlebars_1.default.compile(joinerTemplateSource);
const otpTemplate = handlebars_1.default.compile(otpTemplateSource);
const invoiceTemplate = handlebars_1.default.compile(invoiceTempSource);
const receivedTemplate = handlebars_1.default.compile(receivedTempSource);
const joinerHtml = (joinData) => {
    return joinerTemplate(Object.assign({}, joinData));
};
exports.joinerHtml = joinerHtml;
const otpHtml = (otpData) => {
    return otpTemplate(Object.assign({}, otpData));
};
exports.otpHtml = otpHtml;
const invoiceHtml = (p) => {
    return invoiceTemplate(Object.assign({}, p));
};
exports.invoiceHtml = invoiceHtml;
const receivedHtml = (p) => {
    return receivedTemplate(Object.assign({}, p));
};
exports.receivedHtml = receivedHtml;
