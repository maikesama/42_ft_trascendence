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
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const friend_service_1 = require("./friend.service");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async inviteFriend(body, req) {
        const user = req.user;
        return await this.friendService.inviteFriend(body, user['sub']);
    }
    async acceptInvite(body, req) {
        const user = req.user;
        return await this.friendService.acceptInvite(body, user['sub']);
    }
    async declineInvite(body, req) {
        const user = req.user;
        return await this.friendService.declineInvite(body, user['sub']);
    }
    async removeInvite(body, req) {
        const user = req.user;
        return await this.friendService.removeInvite(body, user['sub']);
    }
    async getFriends(body, req) {
        const user = req.user;
        return await this.friendService.getFriends(body, user['sub']);
    }
    async removeFriend(body, req) {
        const user = req.user;
        return await this.friendService.removeFriend(body, user['sub']);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('inviteFriend'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "inviteFriend", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('acceptInvite'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "acceptInvite", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('declineInvite'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "declineInvite", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('removeInvite'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "removeInvite", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('getFriends'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "getFriends", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('removeFriend'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "removeFriend", null);
FriendController = __decorate([
    (0, common_1.Controller)('friend'),
    __metadata("design:paramtypes", [friend_service_1.FriendService])
], FriendController);
exports.FriendController = FriendController;
//# sourceMappingURL=friend.controller.js.map