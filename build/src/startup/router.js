"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSetup = void 0;
const routes_1 = __importDefault(require("../routes"));
const logger_1 = __importDefault(require("./logger"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("../handlers/middlewares/auth"));
const config_ts_1 = __importDefault(require("../config.ts"));
const logger = new logger_1.default('router setup');
const routerSetup = (app) => {
    //middlewares
    app.use((0, morgan_1.default)('common'));
    app.use((0, helmet_1.default)());
    const corOptions = {
        origin: '*'
    };
    app.use((0, cors_1.default)(corOptions));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json({ limit: '15MB' }));
    app.get('/new_ab/liveprobe', (req, res) => {
        logger.genLog('server live probe');
        res.status(200).json({
            status: 'Live',
            message: 'Server is running on port : ' + config_ts_1.default.app.PORT
        });
    });
    //api
    app.use('/api/v1', auth_1.default, routes_1.default);
};
exports.routerSetup = routerSetup;
