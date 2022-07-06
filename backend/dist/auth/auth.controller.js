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
const node_fetch_1 = require("node-fetch");
const guards_1 = require("./guards");
let AuthController = class AuthController {
    constructor(prisma, authservice) {
        this.prisma = prisma;
        this.authservice = authservice;
    }
    login(res) {
        return res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=c226c936db32c32c2c9e438d2b4f8389e53598d521963643b76c1be5385b6b2f&redirect_uri=http%3A%2F%2F${process.env.HOST}%3A3333%2Fauth%2F42%2Fcallback&response_type=code`);
    }
    getAuthCode(query, res) {
        (0, node_fetch_1.default)('https://api.intra.42.fr/oauth/token?' + new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: query,
            redirect_uri: `http://${process.env.HOST}:3333/auth/42/callback`,
        }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
            console.log(response);
            return response.json();
        })
            .then(data => {
            console.log(data);
            this.getToken(data.access_token, res);
        })
            .then(res.redirect(`http://${process.env.HOST}:3000/home`));
    }
    getToken(token, res) {
        let first = false;
        try {
            console.log(`Bearer ${token}`);
            return (0, node_fetch_1.default)('https://api.intra.42.fr/v2/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                console.log(response);
                return response.json();
            })
                .then(datiJson => {
                let ret = ({
                    idIntra: datiJson.login,
                    userName: `${datiJson.login}_${String(Date.now())}`,
                    firstName: datiJson.first_name,
                    lastName: datiJson.last_name,
                    img: datiJson.image_url,
                    email: datiJson.email,
                });
                console.log(ret);
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
            });
        }
        catch (e) {
            throw new common_1.HttpException("Something wrong " + e.message, common_1.HttpStatus.CONFLICT);
        }
    }
    status() {
        return { msg: 'ok' };
    }
    logout() { }
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
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getToken", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(guards_1.AuthenticateGuards),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "status", null);
__decorate([
    (0, common_1.Get)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map