"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const strategies_1 = require("../auth/strategies");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const prisma_service_1 = require("../prisma/prisma.service");
const TwoFA_service_1 = require("./../auth/TwoFA/TwoFA.service");
const auth_service_1 = require("./../auth/auth.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_service_1.AuthService, strategies_1.AtStrategy, jwt_1.JwtService, prisma_service_1.PrismaService, TwoFA_service_1.TwoFactorAuthenticationService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map