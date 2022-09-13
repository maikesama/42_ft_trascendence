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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const node_fetch_1 = require("node-fetch");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getAuthCode(query, res) {
        (0, node_fetch_1.default)('https://api.intra.42.fr/oauth/token?' + new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: query,
            redirect_uri: `http://${process.env.HOST}:80/api/auth/42/callback`,
        }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
            this.getToken(data.access_token, res);
        });
    }
    async getToken(token, res) {
        let first = false;
        try {
            return (0, node_fetch_1.default)('https://api.intra.42.fr/v2/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(datiJson => {
                let ret = ({
                    idIntra: datiJson.login,
                    userName: `${datiJson.login}_${String(Date.now())}`,
                    firstName: datiJson.first_name,
                    lastName: datiJson.last_name,
                    img: datiJson.image_url,
                    email: datiJson.email,
                });
                return ret;
            })
                .then(async (ret) => {
                let user;
                try {
                    user = await this.prisma.user.findUnique({
                        where: {
                            idIntra: ret.idIntra,
                        },
                        rejectOnNotFound: true
                    });
                }
                catch (e) {
                    first = true;
                    user = await this.prisma.user.create({
                        data: ret
                    });
                }
                if (user.twoFa === true)
                    res.redirect(`/api/auth/2fa/${user.id}`);
                else {
                    const tokens = await this.generateJwtTokens(user.id, user.email);
                    res.cookie('at', tokens.access_token, { httpOnly: true });
                    res.redirect('/home');
                }
            });
        }
        catch (e) {
            throw new common_2.HttpException("Something wrong " + e.message, common_2.HttpStatus.CONFLICT);
        }
    }
    hashData(data) {
        return argon.hash(data);
    }
    async generateJwtTokens(userId, email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: process.env.AtSecret,
                expiresIn: 60
            }),
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: process.env.RtSecret,
                expiresIn: 60 * 15
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt
        };
    }
};
__decorate([
    __param(0, (0, common_2.Query)('code')),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getAuthCode", null);
__decorate([
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getToken", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map