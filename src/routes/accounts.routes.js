"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../handlers/controllers");
const accountsRouter = express_1.default.Router();
accountsRouter.post("/user", controllers_1.accountsController.updateUser);
accountsRouter.get("/user/filter", controllers_1.accountsController.filterUserSearch);
accountsRouter.get("/user", controllers_1.accountsController.getUser);
accountsRouter.put("/user/password", controllers_1.accountsController.updatePassword);
accountsRouter.post("/user/edit", controllers_1.accountsController.updateUser);
accountsRouter.get("/user/search", controllers_1.accountsController.searchUser);
exports.default = accountsRouter;
