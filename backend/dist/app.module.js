"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("./prisma/prisma.service");
const microservices_1 = require("@nestjs/microservices");
const app_gateway_1 = require("./app.gateway");
const chat_module_1 = require("./chat/chat.module");
const chat_service_1 = require("./chat/chat.service");
const friend_service_1 = require("./friend/friend.service");
const friend_module_1 = require("./friend/friend.module");
const games_module_1 = require("./games/games.module");
const games_service_1 = require("./games/games.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            chat_module_1.ChatModule,
            friend_module_1.FriendModule,
            games_module_1.GamesModule,
            passport_1.PassportModule.register({ session: true }),
            microservices_1.ClientsModule.register([
                {
                    name: "NOTIFICATION_SERVICE",
                    transport: microservices_1.Transport.TCP
                }
            ])
        ],
        controllers: [],
        providers: [prisma_service_1.PrismaService, app_gateway_1.AppGateway, chat_service_1.ChatService, friend_service_1.FriendService, games_service_1.GamesService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map