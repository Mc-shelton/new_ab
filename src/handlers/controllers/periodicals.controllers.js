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
exports.getBooks = exports.getArticles = exports.getSermons = exports.createPeriodicals = exports.getPeriodicals = void 0;
const types_1 = require("../types");
const services_1 = require("../services");
const errors_1 = require("../errors");
const logger_1 = __importDefault(require("../../startup/logger"));
const logger = new logger_1.default("events controller");
const createPeriodicals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, name, type, avTime, forDate, } = req.body;
    if ([title, name, type, avTime, forDate].some((v) => !v))
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const u = yield services_1.periodicalsService.createPeriodicals(req.body);
        res.status(200).json({ message: "periodical updated", data: u });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.createPeriodicals = createPeriodicals;
const getPeriodicals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield services_1.periodicalsService.getPeriodicals();
        res.status(200).json({ message: "periodicals", data: events });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getPeriodicals = getPeriodicals;
const getSermons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sermons = yield services_1.periodicalsService.getSermons();
        res.status(200).json({ message: "sermons", data: sermons });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getSermons = getSermons;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sermons = yield services_1.periodicalsService.getBooks();
        res.status(200).json({ message: "books", data: sermons });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getBooks = getBooks;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sermons = yield services_1.periodicalsService.getArticles();
        res.status(200).json({ message: "artcles", data: sermons });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getArticles = getArticles;
