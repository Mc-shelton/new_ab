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
exports.getRoomChats = exports.createRoom = exports.joinRoom = exports.addChat = exports.getUserRooms = void 0;
const logger_1 = __importDefault(require("../../startup/logger"));
const services_1 = require("../services");
const types_1 = require("../types");
const errors_1 = require("../errors");
const logger = new logger_1.default("rooms controller");
const getUserRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user)
        return res.status(400).json({ message: types_1.errorEnums.PROFILE });
    try {
        const rooms = yield services_1.roomsService.getUserRooms(user.id);
        res.status(200).json({ message: "user rooms", data: rooms });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getUserRooms = getUserRooms;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, ab_title, description } = req.body;
    const user = req.user;
    if (!user)
        return res.status(400).json({ message: types_1.errorEnums.PROFILE });
    if (!user.name)
        return res.status(400).json({
            message: 'please update your user details to access this resource'
        });
    if (!title || !ab_title || !description)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        let room = {
            title,
            ab_title,
            description,
        };
        const newRoom = yield services_1.roomsService.createRoom(room, user.id);
        res.status(200).json({ message: "room created", data: newRoom });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.createRoom = createRoom;
const getRoomChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_id } = req.query;
    try {
        const chats = yield services_1.roomsService.getRoomChats(room_id);
        res.status(200).json({ message: "room chats", data: chats });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getRoomChats = getRoomChats;
const addChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_id, message } = req.body;
    const user = req.user;
    if (!user)
        return res.status(400).json({ message: types_1.errorEnums.PROFILE });
    if (!room_id || !message)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const chat = yield services_1.roomsService.addChat(room_id, message, user.id);
        res.status(200).json({ message: "chat created", data: chat });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.addChat = addChat;
const joinRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_id } = req.body;
    const user = req.user;
    if (!user)
        return res.status(400).json({ message: types_1.errorEnums.PROFILE });
    if (!room_id)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const room = yield services_1.roomsService.joinRoom(user.id, room_id);
        res.status(200).json({ message: "chat created", data: room });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.joinRoom = joinRoom;
