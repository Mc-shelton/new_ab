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
const pings_sub_1 = __importDefault(require("../events/pings.sub"));
const encryption_1 = require("../../encryption");
const config_ts_1 = __importDefault(require("../../config.ts"));
const errors_1 = require("../errors");
const updater_1 = __importDefault(require("../../services_layer/utils/updater"));
const userErrors_1 = require("../errors/userErrors");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    createUser(user, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepo.getUser({
                email: user.email,
            });
            if (existingUser)
                throw new userErrors_1.UsedEmail(user.email);
            if (!user.name)
                user.name = '';
            let names = user.name.trim().split(" ");
            names = names.map((l) => {
                return l[0].toUpperCase() + l.slice(1);
            });
            let firstName = names[0];
            user.name = names.join(" ");
            const newUser = yield this.userRepo.createUser(user, actor);
            //emit emial
            let d = {
                name: firstName,
                email: newUser.email,
            };
            pings_sub_1.default.emit("send_mail", d);
            return newUser;
        });
    }
    deleteUser(phone, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.userRepo.deleteUser(phone, actor);
            return id;
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.getUserById(userId);
        });
    }
    searchUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.searchUser(user);
        });
    }
    signInUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = Math.floor(100000 + Math.random() * 900000);
            let p = (0, encryption_1.hashChallenge)(config_ts_1.default.app.CRYPTO_SECRET, password);
            const user = yield this.userRepo.signInUser(email, p);
            if (!user) {
                let nU = {
                    email,
                };
                const newUser = yield this.userRepo.createUser(nU, 'actor');
                return newUser;
            }
            return user;
        });
    }
    lockAccount(id, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.lockAccount(id, actor);
        });
    }
    updateUser(user, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            //pick user
            const userData = yield this.userRepo.getUserById(user.id);
            if (!userData)
                throw new errors_1.UserErrors(user.id);
            const userMaped = (0, updater_1.default)(userData, user);
            //send update
            return yield this.userRepo.updateUser(userMaped, actor);
        });
    }
    filterUser(email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.getUser({ email, phone });
        });
    }
    filterUserSearch(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.filterUser(user);
        });
    }
    signInSso(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.getUser({ email: "email", phone: "phone" });
        });
    }
};
UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("userRepo")),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.default = UserService;
