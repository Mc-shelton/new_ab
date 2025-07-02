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
exports.getPioneerEstate = exports.getPioneer = exports.getEgwEstate = exports.getQuarterliesBooks = exports.getEgwContent = exports.getEgwFolder = exports.getLessons = void 0;
const types_1 = require("../types");
const errors_1 = require("../errors");
const logger_1 = __importDefault(require("../../startup/logger"));
const axios_1 = __importDefault(require("axios"));
const picker_1 = __importDefault(require("../../services_layer/utils/picker"));
const logger = new logger_1.default('estate controller');
const base_urls = {
    q: 'https://sabbath-school.adventech.io/api/v2/',
    e: 'https://legacy.egwwritings.org/modules/writings/'
};
const getLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield axios_1.default.get(`${base_urls.q}en/quarterlies/index.json`);
        if (!books.data)
            return res.status(400).json({
                message: 'failed could not get resource'
            });
        const b_data = books.data.filter((l) => {
            if (!l.quarterly_group)
                return false;
            return l['quarterly_group']['name'] == 'Standard Adult';
        }).map((l, x) => {
            return (0, picker_1.default)(l, ['path', 'title', 'cover', 'splash']);
        });
        res.status(200).json({
            message: 'lessons media',
            data: b_data,
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getLessons = getLessons;
const getEgwEstate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make the request to the remote resource
        const response = yield axios_1.default.get(`${base_urls.e}tree/treedata.php`);
        // Send only the response data to the client
        res.status(200).json({
            message: 'estate media',
            data: response.data,
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
    ;
});
exports.getEgwEstate = getEgwEstate;
const getPioneer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make the request to the remote resource
        const response = yield axios_1.default.get(`${base_urls.e}tree/treedata.php?parentnode=f_16`);
        // Send only the response data to the client
        res.status(200).json({
            message: 'estate media',
            data: response.data,
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
    ;
});
exports.getPioneer = getPioneer;
const getPioneerEstate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { node } = req.query;
    console.log("@@##########", node);
    try {
        // Make the request to the remote resource
        const response = yield axios_1.default.get(`${base_urls.e}tree/treedata.php?parentnode=${node}`);
        // Send only the response data to the client
        res.status(200).json({
            message: 'estate media',
            data: response.data,
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
    ;
});
exports.getPioneerEstate = getPioneerEstate;
const getEgwFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query;
    try {
        // Make the request to the remote resource
        const response = yield axios_1.default.get(`${base_urls.e}tree/treedata.php?parentnode=${url}`);
        // Send only the response data to the client
        res.status(200).json({
            message: 'estate media',
            data: response.data,
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
    ;
});
exports.getEgwFolder = getEgwFolder;
const getEgwContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pub, maxpuborder } = req.query;
    try {
        console.log("payload", req.query);
        // Make the request to the remote resource
        const response = yield axios_1.default.get(`${base_urls.e}textview/getid_elementauto.php?id_pub=${id_pub}`);
        if (!response.data)
            return res.status(400).json({
                message: 'failed could not get resource'
            });
        let retContent = [];
        let counter = 0;
        let id_el = response.data.id_elementauto;
        while (counter < response.data.maxpuborder) {
            const content = yield axios_1.default.get(`${base_urls.e}writingsview/showrecords.php?startID=${id_el}&amount=${response.data.maxpuborder.toString()}&initload=true&mobile=0`);
            let mid = content.data.elements.middle;
            let lastMid = mid[mid.length - 1].id_elementauto;
            let lastOrd = mid[mid.length - 1].order;
            id_el = lastMid + 1;
            counter = lastOrd;
            retContent = [...retContent, ...content.data.elements.middle];
        }
        // Send only the response data to the client
        res.status(200).json({
            message: 'estate media',
            data: {
                elements: {
                    middle: retContent
                }
            },
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
    ;
});
exports.getEgwContent = getEgwContent;
const getQuarterliesBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { path } = req.query;
    if (!path)
        return res.status(400).json({
            message: types_1.errorEnums.FIELDS
        });
    try {
        let books = yield axios_1.default.get(`${base_urls.q}${path}/lessons/index.json`);
        if (!books.data)
            return res.status(400).json({
                message: 'failed could not get resource'
            });
        const b_data = books.data.map((l, x) => {
            return (0, picker_1.default)(l, ['title', 'start_date', 'end_date', 'path', 'cover']);
        });
        res.status(200).json({
            message: 'lessons media',
            data: b_data,
        });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
    ;
});
exports.getQuarterliesBooks = getQuarterliesBooks;
