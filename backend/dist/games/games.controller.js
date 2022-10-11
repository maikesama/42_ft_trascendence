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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const games_service_1 = require("./games.service");
let GamesController = class GamesController {
    constructor(GamesService) {
        this.GamesService = GamesService;
    }
    async createGame(body, req) {
        const user = req.user;
        return await this.GamesService.createGame(body);
    }
    async updateGame(body, req) {
        const user = req.user;
        return await this.GamesService.updateGame(body);
    }
    async getLeaderboard(body, req) {
        const user = req.user;
        return await this.GamesService.getLeaderboard(body);
    }
    async getWinner(body, req) {
        const user = req.user;
        return await this.GamesService.getWinner(body);
    }
    async getLoser(body, req) {
        const user = req.user;
        return await this.GamesService.getLoser(body);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('createGame'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "createGame", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('updateGame'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "updateGame", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('getLeaderboard'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('getWinner'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getWinner", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('getLoser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getLoser", null);
GamesController = __decorate([
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
exports.GamesController = GamesController;
//# sourceMappingURL=games.controller.js.map