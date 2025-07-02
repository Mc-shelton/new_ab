"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const tsyringe_1 = require("tsyringe");
const shops_repo_1 = __importDefault(require("../repositories/shops.repo"));
const invoice_1 = require("../../services_layer/pings/invoice");
const getDate_1 = require("../../services_layer/utils/getDate");
const randomiz_1 = __importDefault(require("../../services_layer/utils/randomiz"));
const errors_1 = require("../errors");
let ShopsService = class ShopsService {
    constructor(shopsRepo, userRepo) {
        this.shopsRepo = shopsRepo;
        this.userRepo = userRepo;
    }
    createItem(item, thumb_nails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shopsRepo.createItemThumbNails(thumb_nails);
            return yield this.shopsRepo.createItem(item);
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.getItems();
        });
    }
    createOrder(order, orderItems, owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.userRepo.getUserById(owner_id);
            if (!customer)
                throw new errors_1.UserErrors(owner_id);
            const now = new Date();
            const gen = `#AHC_${(0, randomiz_1.default)(4)}`.toUpperCase();
            // generate order_id
            // TODO: check/update instores
            order.order_id = gen;
            order.customer_id = owner_id;
            const neworder = yield this.shopsRepo.createOrder(order);
            //send mail here
            const recMailData = {
                customer_name: customer.name || "guest",
                customer_email: customer.email,
                invoice_id: gen,
                created_at: (0, getDate_1.getDate)(now),
            };
            (0, invoice_1.receivedMail)(recMailData);
            let nOrderItems = orderItems.map(item => {
                {
                    let t = {
                        item_id: item.id,
                        order_id: neworder.order_id,
                        quantity: item.quantity
                    };
                    return t;
                }
            });
            yield this.shopsRepo.createOrderItem(nOrderItems);
            let newItems = yield this.shopsRepo.getOrderItemsByOrderId(neworder.order_id);
            let nItems = newItems.map(l => {
                let item = {
                    name: l.Item.name,
                    quantity: l.quantity.toString(),
                    price: l.Item.price
                };
                return item;
            });
            const due = new Date();
            due.setDate(due.getDate() + 7);
            const invoiceData = Object.assign(Object.assign({}, recMailData), { due_at: (0, getDate_1.getDate)(due), customer_id: customer.id.slice(6).toUpperCase(), time: (0, getDate_1.getTime)(due), items: nItems, total: newItems.reduce((a, b) => a + parseInt(b.Item.price), 0).toString(), location: 'Town CBD' });
            (0, invoice_1.mail)(invoiceData);
            return neworder;
        });
    }
    getUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.getUserOrders(userId);
        });
    }
    changeOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.changeOrderStatus(orderId, status);
        });
    }
};
ShopsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("shopsRepo")),
    __param(1, (0, tsyringe_1.inject)("userRepo")),
    __metadata("design:paramtypes", [shops_repo_1.default, Object])
], ShopsService);
exports.default = ShopsService;
