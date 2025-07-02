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
exports.getEvents = exports.createEvent = void 0;
const types_1 = require("../types");
const services_1 = require("../services");
const errors_1 = require("../errors");
const logger_1 = __importDefault(require("../../startup/logger"));
const logger = new logger_1.default("events controller");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, description, organizer, location, repeat, date, base64 } = req.body;
    if ([title, image, description, organizer, location, repeat, base64, date].some((v) => !v))
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const u = yield services_1.eventsService.createEvent(req.body);
        res.status(200).json({ message: "event updated", data: u });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield services_1.eventsService.getEvents();
        res.status(200).json({ message: "events", data: events });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getEvents = getEvents;
