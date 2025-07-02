"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const accounts_routes_1 = __importDefault(require("./accounts.routes"));
const oath_routes_1 = __importDefault(require("./oath.routes"));
const basic_routes_1 = __importDefault(require("./basic.routes"));
const events_routes_1 = __importDefault(require("./events.routes"));
const periodical_router_1 = __importDefault(require("./periodical.router"));
const shops_routes_1 = __importDefault(require("./shops.routes"));
const rooms_routes_1 = __importDefault(require("./rooms.routes"));
const estate_routes_1 = __importDefault(require("./estate.routes"));
const apiv1 = express_1.default.Router();
apiv1.use("/static", (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
}, express_1.default.static(path_1.default.join("assets", "files"), {
    setHeaders: (res, path) => {
        res.setHeader("Content-Type", "image/png"); // Adjust the content type based on your image type
        res.setHeader("Cache-Control", "public, max-age=31536000"); // Adjust caching settings as needed
    },
}));
apiv1.use("/estate", estate_routes_1.default);
apiv1.use("/accounts", accounts_routes_1.default);
apiv1.use("/basicAuth", basic_routes_1.default);
apiv1.use("/events", events_routes_1.default);
apiv1.use("/periodicals", periodical_router_1.default);
apiv1.use('/rooms', rooms_routes_1.default);
apiv1.use('/shops', shops_routes_1.default);
apiv1.use("/oauth", oath_routes_1.default);
apiv1.use("/", basic_routes_1.default);
exports.default = apiv1;
