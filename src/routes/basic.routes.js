"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../handlers/controllers");
const basicAuthRoutes = (0, express_1.Router)();
basicAuthRoutes.post("/", controllers_1.accountsController.signInUser);
exports.default = basicAuthRoutes;
