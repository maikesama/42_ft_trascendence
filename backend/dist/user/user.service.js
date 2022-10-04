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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getProfile(Id) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: Id
            }
        });
        delete user.otpSecret;
        delete user.otpUrl;
        delete user.twoFa;
        return user;
    }
    async getUserProfile(idintra, requestedBy) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: idintra
                },
            });
            delete user.otpSecret;
            delete user.otpUrl;
            delete user.twoFa;
            const requestedByUser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: requestedBy
                }
            });
            const canSee = await this.checkIfBlocked(idintra, requestedByUser.idIntra);
            if (!canSee)
                throw new common_2.HttpException("Blocked", common_2.HttpStatus.BAD_REQUEST);
            return user;
        }
        catch (e) {
            throw new common_2.HttpException(e.message, common_2.HttpStatus.BAD_REQUEST);
        }
    }
    async checkIfBlocked(idintra, requestIdIntra) {
        const blocked = await this.prisma.blocklist
            .findMany({ where: {
                blockId: idintra,
                blockedId: idintra
            } });
        let bool = blocked.find(block => {
            return block.blockId === requestIdIntra;
        });
        if (bool)
            return false;
        bool = blocked.find(block => {
            return block.blockedId === requestIdIntra;
        });
        if (bool)
            return false;
        return true;
    }
    async getAllUsers() {
        let allUsers = await this.prisma.user.findMany({});
        allUsers = allUsers.map((user) => this.deleteSecrets(user));
        return allUsers;
    }
    deleteSecrets(user) {
        let usr = user;
        delete usr.twoFa;
        delete usr.otpSecret;
        delete usr.otpUrl;
        return user;
    }
    async block(idintra, requestId) {
        const me = await this.prisma.user.findUniqueOrThrow({ where: { id: requestId } });
        await this.prisma.blocklist.create({
            data: {
                blockId: idintra,
                blockedId: me.idIntra
            }
        });
    }
    async unblock(idintra, requestId) {
        const me = await this.prisma.user.findUniqueOrThrow({ where: { id: requestId } });
        await this.prisma.blocklist.deleteMany({
            where: {
                blockId: idintra,
                blockedId: me.idIntra
            }
        });
    }
    async turnOffTwoFa(Id) {
        await this.prisma.user.update({
            where: {
                id: Id
            },
            data: {
                twoFa: false,
                otpSecret: "",
                otpUrl: ""
            }
        });
    }
    async changepp(body, id) {
        await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                img: body.img
            }
        });
    }
    async changeUserName(body, id) {
        await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                userName: body.userName
            }
        });
    }
    async getChats(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        const ret = await this.prisma.partecipant.findMany({
            where: {
                idIntra: user.idIntra
            },
            include: {
                chat: true
            }
        });
        let rret = await Promise.all(ret.map(async (part) => {
            let partecipant = await this.prisma.partecipant.findMany({
                where: {
                    idChat: part.chat.id
                },
                include: {
                    user: true,
                }
            });
            part.partecipant = partecipant;
            return part;
        }));
        return rret;
    }
    async showChat(idChat) {
        const chat = await this.prisma.chat.findUnique({
            where: {
                id: idChat
            },
            include: {
                partecipant: true
            }
        });
        chat.partecipant = await Promise.all(chat.partecipant.map(async (partecipant) => {
            let user = await this.prisma.user.findUnique({
                where: {
                    idIntra: partecipant.idIntra,
                },
                select: {
                    id: true,
                    idIntra: true,
                    img: true,
                    userName: true
                }
            });
            return user;
        }));
        return chat;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map