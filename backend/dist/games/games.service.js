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
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamesService = class GamesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWinner(body) {
        try {
            const infoWinner = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.winner
                },
                select: {
                    rank: true,
                    win: true,
                    winRow: true,
                }
            });
            return infoWinner;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async getLoser(body) {
        try {
            const infoLoser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.loser
                },
                select: {
                    rank: true,
                    loss: true,
                    winRow: true,
                }
            });
            return infoLoser;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async createGame(body) {
        try {
            const game = await this.prisma.games.create({
                data: {
                    user1: body.user1,
                    user2: body.user2,
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async updateGame(body) {
        try {
            const game = await this.prisma.games.update({
                where: {
                    idGame: body.idGame,
                },
                data: {
                    endedAt: new Date(),
                    winner: body.winner,
                    loser: body.loser,
                    scoreP1: body.scoreP1,
                    scoreP2: body.scoreP2,
                    status: "ended",
                }
            });
            const infoWinner = await this.getWinner(body.winner);
            const infoLoser = await this.getLoser(body.loser);
            const loser = await this.prisma.user.update({
                where: {
                    idIntra: body.loser
                },
                data: {
                    rank: infoLoser.rank - 30,
                    loss: infoLoser.loss + 1,
                    winRow: 0,
                }
            });
            const winner = await this.prisma.user.update({
                where: {
                    idIntra: body.winner
                },
                data: {
                    rank: infoWinner.rank + 30,
                    loss: infoWinner.win + 1,
                    winRow: infoWinner.winRow + 1,
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async getLeaderboard(body) {
        try {
            const leaderboard = await this.prisma.user.findMany({
                orderBy: {
                    rank: 'desc'
                }
            });
            leaderboard.forEach((user) => {
                delete user.otpSecret;
                delete user.otpUrl;
                delete user.twoFa;
            });
            return leaderboard;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
};
GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map