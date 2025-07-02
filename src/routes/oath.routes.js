"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../handlers/controllers");
const oAuthRouter = express_1.default.Router();
oAuthRouter.post('/request', controllers_1.oAuthCtonroller.postOuath);
oAuthRouter.get('/', controllers_1.oAuthCtonroller.getOAuth);
oAuthRouter.get('/extra', (req, res) => {
    res.status(200).json({
        message: 'auth'
    });
});
exports.default = oAuthRouter;
