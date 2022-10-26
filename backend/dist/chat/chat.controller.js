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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async newChannel(body, req) {
        const user = req.user;
        return await this.chatService.newChannel(body, user['sub']);
    }
    async getUserPrivilegeInfo(body, req) {
        const user = req.user;
        return await this.chatService.getUserPrivilegeInfo(body, user['sub']);
    }
    async newDm(body, req) {
        const user = req.user;
        return await this.chatService.newDm(body, user['sub']);
    }
    async searchUser(body, req) {
        const user = req.user;
        return await this.chatService.searchUser(body, user['sub']);
    }
    async searchGeneral(body, req) {
        const user = req.user;
        return await this.chatService.searchGeneral(body, user['sub']);
    }
    async muteUser(body, req) {
        const user = req.user;
        return await this.chatService.muteUser(body, user['sub']);
    }
    async unmuteUser(body, req) {
        const user = req.user;
        return await this.chatService.unMuteUser(body, user['sub']);
    }
    async banUser(body, req) {
        const user = req.user;
        return await this.chatService.banUser(body, user['sub']);
    }
    async unbanUser(body, req) {
        const user = req.user;
        return await this.chatService.unBanUser(body, user['sub']);
    }
    async joinChannel(body, req) {
        const user = req.user;
        return await this.chatService.joinChannel(body, user['sub']);
    }
    async leaveChannel(body, req) {
        const user = req.user;
        return await this.chatService.leaveChannel(body, user['sub']);
    }
    async changePassword(body, req) {
        const user = req.user;
        return await this.chatService.changePassword(body, user['sub']);
    }
    async changeVisibility(body, req) {
        const user = req.user;
        return await this.chatService.changeVisibility(body, user['sub']);
    }
    async addUser(body, req) {
        const user = req.user;
        return await this.chatService.addUser(body, user['sub']);
    }
    async removeUser(body, req) {
        const user = req.user;
        return await this.chatService.removeUser(body, user['sub']);
    }
    async addAdmin(body, req) {
        const user = req.user;
        return await this.chatService.addAdmin(body, user['sub']);
    }
    async removeAdmin(body, req) {
        const user = req.user;
        return await this.chatService.removeAdmin(body, user['sub']);
    }
    async getChannels(req) {
        const user = req.user;
        return await this.chatService.getChannels(user['sub']);
    }
    async getChanUsers(body, req) {
        const user = req.user;
        return await this.chatService.getChanUsers(body, user['sub']);
    }
    async getChatUsers(body, req) {
        const user = req.user;
        return await this.chatService.getChatUsers(body, user['sub']);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('newChannel'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "newChannel", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('getUserPrivilegeInfo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUserPrivilegeInfo", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('newDm'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "newDm", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('searchUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "searchUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('searchGeneral'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "searchGeneral", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('muteUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "muteUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('unmuteUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "unmuteUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('banUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "banUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('unbanUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "unbanUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('joinChannel'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "joinChannel", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('leaveChannel'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "leaveChannel", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('changePassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('changeVisibility'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "changeVisibility", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('addUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "addUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('removeUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "removeUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('addAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('removeAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "removeAdmin", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('getChannels'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChannels", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('getChanUsers'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChanUsers", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('getChatUsers'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatUsers", null);
ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map