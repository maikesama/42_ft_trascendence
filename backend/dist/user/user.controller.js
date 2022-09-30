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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("./user.service");
const TwoFA_service_1 = require("./../auth/TwoFA/TwoFA.service");
let UserController = class UserController {
    constructor(prisma, jwt, userservice, twofa) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.userservice = userservice;
        this.twofa = twofa;
    }
    async getMe(req) {
        const user = req.user;
        return await this.userservice.getProfile(user['sub']);
    }
    async getUserProfile(idIntra, req) {
        const user = req.user;
        return await this.userservice.getUserProfile(idIntra, user['sub']);
    }
    async getAllUsers() {
        return await this.userservice.getAllUsers();
    }
    async blockUser(idIntra, req) {
        const user = req.user;
        return await this.userservice.block(idIntra, user['sub']);
    }
    async unblockUser(idIntra, req) {
        const user = req.user;
        return await this.userservice.unblock(idIntra, user['sub']);
    }
    async turnOn2fa(req) {
        const user = req.user;
        console.log(user);
        return await this.twofa.turnOnTwoFa(user['sub']);
    }
    async turnOff2fa(req) {
        const user = req.user;
        return await this.userservice.turnOffTwoFa(user['sub']);
    }
    async changePP(body, req) {
        const user = req.user;
        return await this.userservice.changepp(body, user['sub']);
    }
    async changeusername(body, req) {
        const user = req.user;
        return await this.userservice.changepp(body, user['sub']);
    }
    async getUserChat(req) {
        const user = req.user;
        return await this.userservice.getChats(user['sub']);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)(':idIntra'),
    (0, common_1.Bind)((0, common_1.Param)('idIntra')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('block/:idIntra'),
    (0, common_1.Bind)((0, common_1.Param)('idIntra')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "blockUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('unblock/:idIntra'),
    (0, common_1.Bind)((0, common_1.Param)('idIntra')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unblockUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)('turn-on-2fa'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "turnOn2fa", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)('turn-off-2fa'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "turnOff2fa", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('update/pp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePP", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('update/username'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeusername", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('getUserChat'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserChat", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        user_service_1.UserService,
        TwoFA_service_1.TwoFactorAuthenticationService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map