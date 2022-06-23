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
exports.FTStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
const prisma_service_1 = require("../../prisma/prisma.service");
let FTStrategy = class FTStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy) {
    constructor(authService, prisma) {
        super({
            clientID: process.env.UID,
            clientSecret: process.env.SECRET,
            callbackURL: "http://localhost:3000/auth/42/callback",
            scope: ['id'],
            profileFields: {
                'id': function (obj) { return String(obj.id); },
                'username': 'login',
                'displayName': 'displayname',
                'name.familyName': 'last_name',
                'name.givenName': 'first_name',
                'profileUrl': 'url',
                'emails.0.value': 'email',
                'phoneNumbers.0.value': 'phone',
                'photos.0.value': 'image_url'
            }
        });
        this.authService = authService;
        this.prisma = prisma;
    }
    async validate(accesToken, refreshToken, profileFields) {
        const { id, email, username } = profileFields;
        const details = { id, email, username };
        return this.authService.validateUser(details);
    }
};
FTStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], FTStrategy);
exports.FTStrategy = FTStrategy;
;
//# sourceMappingURL=42.strategy.js.map