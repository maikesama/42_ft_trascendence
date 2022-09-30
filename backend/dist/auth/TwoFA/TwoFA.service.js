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
exports.TwoFactorAuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const auth_service_1 = require("../auth.service");
let TwoFactorAuthenticationService = class TwoFactorAuthenticationService {
    constructor(prisma, authservice) {
        this.prisma = prisma;
        this.authservice = authservice;
    }
    async turnOnTwoFa(id) {
        let otp = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                otpSecret: true
            }
        });
        if (otp.otpSecret === "") {
            let secret = speakeasy.generateSecret({
                name: "42Pong"
            });
            await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    otpSecret: secret.base32,
                    otpUrl: secret.otpauth_url,
                }
            });
        }
    }
    async complete2fa(body) {
        var Id = +body;
        console.log(Id);
        this.turnOnTwoFa(Id);
        let secret = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: Id
            },
            select: {
                twoFa: true,
                otpUrl: true,
            }
        });
        if (!secret.twoFa)
            return;
        if (secret.otpUrl) {
            console.log(secret.otpUrl);
            return (await qrcode.toDataURL(secret.otpUrl));
        }
        else
            return "non ce niente";
    }
    async verify2fa(body, res) {
        let user = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: body.id
            },
            select: {
                idIntra: true,
                otpSecret: true,
                id: true,
                email: true
            }
        });
        let verified = speakeasy.totp.verify({
            secret: user.otpSecret,
            encoding: 'base32',
            token: body.totp
        });
        if (verified) {
            const tokens = await this.authservice.generateJwtTokens(user.id, user.email);
            res.cookie('at', tokens.access_token, { httpOnly: true });
            res.redirect('/home');
            return true;
        }
        return false;
    }
};
TwoFactorAuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auth_service_1.AuthService])
], TwoFactorAuthenticationService);
exports.TwoFactorAuthenticationService = TwoFactorAuthenticationService;
//# sourceMappingURL=TwoFA.service.js.map