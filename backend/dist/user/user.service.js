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
    async getUserProfile(idintra) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                idIntra: idintra
            }
        });
        delete user.otpSecret;
        delete user.otpUrl;
        delete user.twoFa;
        return user;
    }
    async getAllUsers() {
        const allUsers = await this.prisma.user.findMany({
            select: {
                idIntra: true,
                userName: true,
                img: true,
                win: true,
                loss: true,
                rank: true
            }
        });
        return allUsers;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map