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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
const guards_1 = require("./guards");
const TwoFA_service_1 = require("./TwoFA/TwoFA.service");
let tokens;
let AuthController = class AuthController {
    constructor(prisma, authservice, twoFaService) {
        this.prisma = prisma;
        this.authservice = authservice;
        this.twoFaService = twoFaService;
    }
    login(res) {
        return res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=b8678efb904092c69d53edc729861043485a2654aa77b11de732ce0f0f65701a&redirect_uri=http%3A%2F%2F10.11.7.3%3A3333%2Fauth%2F42%2Fcallback&response_type=code`);
    }
    getAuthCode(query, res) {
        this.authservice.getAuthCode(query, res);
    }
    logout(res) {
        res.clearCookie('at');
        res.redirect(`http://${process.env.HOST}:3000/`);
    }
    async findone(id) {
        let x = await this.twoFaService.complete2fa(id);
        return { QRcode: x };
    }
    async verify2fa(body, res) {
        this.twoFaService.verify2fa(body, res)
            .then((e) => { e ? res.redirect(`http://${process.env.HOST}:3000/`) : res.redirect(`http://${process.env.HOST}:3000/`); return e; });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('42/callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAuthCode", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('2fa/:id'),
    (0, common_1.Bind)((0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findone", null);
__decorate([
    (0, common_1.Post)('verify2fa'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify2fa", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService,
        TwoFA_service_1.TwoFactorAuthenticationService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map