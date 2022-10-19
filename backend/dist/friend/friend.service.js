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
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FriendService = class FriendService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async isFriend(userId, friendId) {
        try {
            const friendship1 = await this.prisma.friend.findUnique({
                where: {
                    friendId_friendById: { friendId: friendId, friendById: userId }
                }
            });
            const friendship2 = await this.prisma.friend.findUnique({
                where: {
                    friendId_friendById: { friendId: userId, friendById: friendId }
                }
            });
            if (friendship1 || friendship2) {
                return true;
            }
            return false;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async isInvited(reqIdIntra, toAddIdIntra) {
        try {
            const inv = await this.prisma.invited.findUnique({
                where: {
                    invitedId_invitedById: { invitedId: toAddIdIntra, invitedById: reqIdIntra }
                }
            });
            if (inv) {
                return true;
            }
            return false;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async inviteFriend(body, userId) {
        try {
            const userToInvite = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            });
            const userRequest = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
            if (await this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new common_1.BadRequestException("Already invited");
            if (await this.isFriend(userRequest.idIntra, userToInvite.idIntra))
                throw new common_1.BadRequestException("Already friend");
            const createInvitation = await this.prisma.invited.create({
                data: {
                    invitedId: userToInvite.idIntra,
                    invitedById: userRequest.idIntra,
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async removeInvite(body, userId) {
        try {
            const userToInvite = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            });
            const userRequest = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
            if (!await this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new common_1.BadRequestException("Not invited");
            if (await this.isFriend(userRequest.idIntra, userToInvite.idIntra))
                throw new common_1.BadRequestException("Already friend");
            const createInvitation = await this.prisma.invited.delete({
                where: {
                    invitedId_invitedById: { invitedId: userToInvite.idIntra, invitedById: userRequest.idIntra }
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async acceptInvite(body, userId) {
        try {
            const invitedMe = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            });
            const Me = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
            if (await this.isFriend(Me.idIntra, invitedMe.idIntra))
                throw new common_1.BadRequestException("Already accepted");
            if (!await this.isInvited(invitedMe.idIntra, Me.idIntra))
                throw new common_1.BadRequestException("Not invited");
            const inviteAccept = await this.prisma.invited.delete({
                where: {
                    invitedId_invitedById: { invitedId: Me.idIntra, invitedById: invitedMe.idIntra }
                }
            });
            const friendshipCreation = await this.prisma.friend.create({
                data: {
                    friendId: Me.idIntra,
                    friendById: invitedMe.idIntra,
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async declineInvite(body, userId) {
        try {
            const invitedMe = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            });
            const Me = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
            if (await this.isFriend(Me.idIntra, invitedMe.idIntra))
                throw new common_1.BadRequestException("Already accepted");
            if (!await this.isInvited(invitedMe.idIntra, Me.idIntra))
                throw new common_1.BadRequestException("Not invited");
            const inviteDecline = await this.prisma.invited.delete({
                where: {
                    invitedId_invitedById: { invitedId: Me.idIntra, invitedById: invitedMe.idIntra }
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async getFriends(body, userId) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
            const friends = await this.prisma.friend.findMany({
                where: {
                    friendById: user.idIntra
                },
                select: {
                    friendId: true
                }
            });
            const friends2 = await this.prisma.friend.findMany({
                where: {
                    friendId: user.idIntra
                },
                select: {
                    friendById: true
                }
            });
            const allFriends = friends.map((friend) => friend.friendId).concat(friends2.map((friend) => friend.friendById));
            const allFriendsInfo = allFriends.map(async (friend) => {
                const friendInfo = await this.prisma.user.findUnique({
                    where: {
                        idIntra: friend
                    },
                    select: {
                        idIntra: true,
                        userName: true,
                        img: true,
                    }
                });
                return friendInfo;
            });
            return Promise.all(allFriendsInfo);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async removeFriend(body, userId) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
            const friend = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            });
            if (!await this.isFriend(user.idIntra, friend.idIntra))
                throw new common_1.BadRequestException("Not friend");
            const remove = await this.prisma.friend.delete({
                where: {
                    friendId_friendById: { friendId: user.idIntra, friendById: friend.idIntra }
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
};
FriendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=friend.service.js.map