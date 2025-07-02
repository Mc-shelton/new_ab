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
exports.updateUser = exports.createUser = exports.updatePassword = exports.lockAccount = exports.getUser = exports.signInUser = exports.searchUser = exports.filterUserSearch = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const types_1 = require("../types");
const logger_1 = __importDefault(require("../../startup/logger"));
const errors_1 = require("../errors");
const auth_1 = __importDefault(require("../../services_layer/auth/auth"));
const logger = new logger_1.default("accounts controller");
const accountsController = express_1.default.Router();
//create a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    if (!email || !name || !phone)
        return res
            .status(400)
            .json({ message: types_1.errorEnums.FIELDS });
    const user = {
        email,
        phone,
        name
    };
    try {
        let newUser = yield services_1.userService.createUser(user, '7a8c1084-be58-44fb-9511-b64efda75304');
        const token = auth_1.default.signToken(newUser);
        res.status(200).json({
            message: 'user created',
            data: token
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ error: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const u = yield services_1.userService.updateUser(req.body, user === null || user === void 0 ? void 0 : user.id);
        const token = auth_1.default.signToken(u);
        res.status(200).json({ message: 'user updated', data: token });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.updateUser = updateUser;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield services_1.userService.searchUser(req.query);
        res.status(200).json({ message: 'users', filters: req.query, data: user });
    }
    catch (error) {
        const err = (0, errors_1.customErrorChecker)(error);
        if (err)
            return res.status(400).json({ message: error.message });
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(error.message);
        console.log('error : ', err);
    }
});
exports.searchUser = searchUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actor = req.user;
    const { password } = req.body;
    if (!password || !actor)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        let user;
        res.status(200).json({ message: 'password updated', data: user });
    }
    catch (error) {
        const err = (0, errors_1.customErrorChecker)(error);
        if (err)
            return res.status(400).json({ message: error.message });
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(error.message);
    }
});
exports.updatePassword = updatePassword;
const lockAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actor = req.user;
    const { userId } = req.body;
    if (!userId || !actor)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const user = yield services_1.userService.lockAccount(userId, actor.id);
        res.status(200).json({ message: 'account locked', data: user });
    }
    catch (error) {
        const err = (0, errors_1.customErrorChecker)(error);
        if (err)
            return res.status(400).json({ message: error.message });
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(error.message);
    }
});
exports.lockAccount = lockAccount;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.id;
    if (!userId)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const user = yield services_1.userService.getUser(userId);
        if (!user)
            throw new errors_1.UserErrors();
        const dToken = auth_1.default.signToken(user);
        res.status(200).json({ message: 'user found', token: dToken });
    }
    catch (error) {
        const err = (0, errors_1.customErrorChecker)(error);
        if (err)
            return res.status(400).json({ message: error.message });
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(error.message);
    }
});
exports.getUser = getUser;
const filterUserSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.query;
    const actor = req.user;
    if (!user)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const user = yield services_1.userService.filterUserSearch(req.query);
        res.status(200).json({ message: 'user filter', data: Object.assign(Object.assign({}, req.query), { data: user }) });
    }
    catch (error) {
        const err = (0, errors_1.customErrorChecker)(error);
        if (err)
            return res.status(400).json({ message: error.message });
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(error.message);
    }
});
exports.filterUserSearch = filterUserSearch;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const user = yield services_1.userService.signInUser(email, 'password');
        const token = auth_1.default.signToken(user);
        res.status(200).json({ message: 'user authenticated', data: token });
    }
    catch (error) {
        const err = (0, errors_1.customErrorChecker)(error);
        if (err)
            return res.status(400).json({ message: error.message });
        res.status(500).json({ message: types_1.errorEnums.SERVER });
        logger.genError(error.message);
    }
});
exports.signInUser = signInUser;
