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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const ftp_1 = require("../../services_layer/ftp");
const getExtension_1 = __importDefault(require("../../services_layer/utils/getExtension"));
let EventsService = class EventsService {
    constructor(eventsRepo) {
        this.eventsRepo = eventsRepo;
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = event, { base64 } = _a, rest = __rest(_a, ["base64"]);
            const tempDir = path_1.default.join(__dirname, "tmp");
            fs_1.default.mkdirSync(tempDir, { recursive: true });
            const extension = (0, getExtension_1.default)(base64);
            const fileName = `${(0, uuid_1.v4)().toString()}.${extension}`;
            const localPath = path_1.default.join(tempDir, fileName);
            const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            fs_1.default.writeFileSync(localPath, buffer);
            console.log(localPath);
            const result = yield (0, ftp_1.uploadToFtp)({
                localPath,
                remoteFileName: fileName,
                remoteFolder: "/events",
            });
            rest.image = `https://adventband.org/bucket/events/${fileName}`;
            // Clean up temp file
            fs_1.default.unlinkSync(localPath);
            return yield this.eventsRepo.createEvent(rest);
        });
    }
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventsRepo.getEvents();
        });
    }
};
EventsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("eventsRepo")),
    __metadata("design:paramtypes", [Object])
], EventsService);
exports.default = EventsService;
