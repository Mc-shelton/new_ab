"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../handlers/controllers");
const eventsRouter = (0, express_1.Router)();
eventsRouter.post("/", controllers_1.eventsController.createEvent);
eventsRouter.get("/", controllers_1.eventsController.getEvents);
exports.default = eventsRouter;
