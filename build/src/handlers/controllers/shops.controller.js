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
exports.changeOrderStatus = exports.getUserOrder = exports.getItems = exports.createItem = exports.createOrder = void 0;
const services_1 = require("../services");
const types_1 = require("../types");
const errors_1 = require("../errors");
const logger_1 = __importDefault(require("../../startup/logger"));
const logger = new logger_1.default("shops contoller");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_items } = req.body;
    console.log(req.body);
    const user = req.user;
    if (!order_items)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    if (!user)
        return res
            .status(401)
            .json({ message: "please sign in to access this resource" });
    const order = {
        customer_id: user.id,
        order_id: "placeholder",
    };
    try {
        const nOrder = yield services_1.shopsService.createOrder(order, order_items, user.id);
        res.status(200).json({ message: "order created", data: nOrder });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.createOrder = createOrder;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, thumb_nails } = req.body;
    try {
        const nItem = yield services_1.shopsService.createItem(item, thumb_nails);
        res.status(200).json({ message: "item created", data: nItem });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.createItem = createItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield services_1.shopsService.getItems();
        res.status(200).json({ message: "shop items", data: items });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getItems = getItems;
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user)
        return res
            .status(401)
            .json({ message: "please sign in to access this resource" });
    try {
        const orders = yield services_1.shopsService.getUserOrders(user.id);
        res.status(200).json({ message: "user orders", data: orders });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.getUserOrder = getUserOrder;
const changeOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, order_id } = req.body;
    if (!status || !order_id)
        return res.status(400).json({ message: types_1.errorEnums.FIELDS });
    try {
        const order = yield services_1.shopsService.changeOrderStatus(order_id, status);
        res.status(200).json({ message: "status changed", data: order });
    }
    catch (err) {
        const error = (0, errors_1.customErrorChecker)(err);
        if (error)
            return res.status(400).json({ message: err.message });
        res.status(500).json({ message: types_1.errorEnums["SERVER"] });
        logger.genError(err.message);
    }
});
exports.changeOrderStatus = changeOrderStatus;
