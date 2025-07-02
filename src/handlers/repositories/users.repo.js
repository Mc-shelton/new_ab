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
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const client_1 = require("@prisma/client");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUser = yield this.prisma.users.upsert({
                where: {
                    email: user.email,
                },
                create: {
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    status: 'ACTIVE'
                },
                update: {
                    name: user.name,
                    phone: user.phone
                }
            });
            return createUser;
        });
    }
    getUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const theUser = this.prisma.users.findFirst({
                where: {
                    AND: [
                        { email: { equals: user.email } },
                        { phone: { equals: user.phone } },
                    ],
                }
            });
            return theUser;
        });
    }
    searchUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(user === null || user === void 0 ? void 0 : user.name) && !(user === null || user === void 0 ? void 0 : user.email) && !(user === null || user === void 0 ? void 0 : user.phone))
                return yield this.prisma.users.findMany();
            return yield this.prisma.users.findMany({
                where: {
                    OR: [
                        { email: { equals: user.email } },
                        { name: { equals: user.name } },
                        { phone: { equals: user.phone } },
                    ]
                }
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.users.findUnique({
                where: {
                    id,
                }
            });
        });
    }
    deleteUser(email, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const delUser = yield this.prisma.users.update({
                where: {
                    email,
                },
                data: {
                    status: 'DELETED'
                }
            });
            return delUser.id;
        });
    }
    updateUser(user, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = user, { acl, acls, Profile, BlackList } = _a, u = __rest(_a, ["acl", "acls", "Profile", "BlackList"]);
            console.log(u);
            return yield this.prisma.users.update({
                where: {
                    id: user.id
                },
                data: u
            });
        });
    }
    signInUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.users.findUnique({
                where: {
                    email,
                }
            });
        });
    }
    lockAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.users.update({
                where: {
                    id
                },
                data: {
                    status: 'BLOCKED'
                }
            });
        });
    }
    filterUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user)
                return yield this.prisma.users.findMany();
            return yield this.prisma.users.findMany({
                where: user
            });
        });
    }
};
UserRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("prisma")),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], UserRepository);
exports.default = UserRepository;
