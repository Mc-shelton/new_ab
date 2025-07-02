"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estateController = exports.roomsController = exports.shopsController = exports.periodicalController = exports.eventsController = exports.oAuthCtonroller = exports.accountsController = void 0;
exports.accountsController = __importStar(require("./accounts.controllers"));
exports.oAuthCtonroller = __importStar(require("./oath"));
exports.eventsController = __importStar(require("./event.controllers"));
exports.periodicalController = __importStar(require("./periodicals.controllers"));
exports.shopsController = __importStar(require("./shops.controller"));
exports.roomsController = __importStar(require("./rooms.controller"));
exports.estateController = __importStar(require("./estate.controllers"));
