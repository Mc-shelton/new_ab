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
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const client_1 = require("@prisma/client");
let RoomsRepository = class RoomsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.rooms.create({
                data: room,
            });
        });
    }
    addChat(room_id, message, sender_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.chats.create({
                data: {
                    room_id,
                    message,
                    sender_id,
                    status: 'DELIVERED'
                }
            });
        });
    }
    getRoomChats(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.chats.findMany({
                where: {
                    room_id
                },
                orderBy: {
                    created_at: 'asc'
                }
            });
        });
    }
    joinRoom(user_id, room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.userRooms.create({
                data: {
                    user_id,
                    room_id
                }
            });
        });
    }
    getUserRooms(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.userRooms.findMany({
                include: {
                    Room: {
                        include: {
                            Owner: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    },
                }
            });
        });
    }
    getRoomByName(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.rooms.findUnique({
                where: {
                    title
                }
            });
        });
    }
};
RoomsRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("prisma")),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], RoomsRepository);
exports.default = RoomsRepository;
