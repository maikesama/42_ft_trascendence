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
    async getWinner(idUser) {
        try {
            return await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: idUser
                },
            });
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
    async getPlayerProfile(body, userId) {
        try {
            const player = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                },
            });
            const leaderboard = await this.prisma.user.findMany({
                orderBy: {
                    rank: 'desc'
                }
            });
            let position = leaderboard.findIndex((user) => user.id === player.id);
            position += 1;
            return position;
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
                    idGame: Number(body.idGame),
                },
                data: {
                    endedAt: new Date(),
                    winner: body.winner,
                    loser: body.loser,
                    scoreP1: Number(body.scoreP1),
                    scoreP2: Number(body.scoreP2),
                    status: "ended",
                }
            });
            const winner = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.winner
                },
            });
            const loser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.loser
                },
            });
            await this.prisma.user.update({
                where: {
                    idIntra: body.loser
                },
                data: {
                    rank: this.minus(loser.rank, 30),
                    loss: this.sum(loser.loss, 1),
                    winRow: 0,
                }
            });
            await this.prisma.user.update({
                where: {
                    idIntra: body.winner
                },
                data: {
                    rank: this.sum(winner.rank, 30),
                    win: this.sum(winner.win, 1),
                    winRow: this.sum(winner.winRow, 1),
                }
            });
            if (winner.win === 1 && winner.achFirstWin === false) {
                await this.prisma.user.update({
                    where: {
                        idIntra: body.winner
                    },
                    data: {
                        achFirstWin: true,
                    }
                });
            }
            if (winner.winRow === 5 && winner.achFiveinRow === false) {
                await this.prisma.user.update({
                    where: {
                        idIntra: body.winner
                    },
                    data: {
                        achFiveinRow: true,
                    }
                });
            }
            if (winner.winRow === 10 && winner.achTeninRow === false) {
                await this.prisma.user.update({
                    where: {
                        idIntra: body.winner
                    },
                    data: {
                        achTeninRow: true,
                    }
                });
            }
            if (winner.winRow === 20 && winner.achTwentyinRow === false) {
                await this.prisma.user.update({
                    where: {
                        idIntra: body.winner
                    },
                    data: {
                        achTwentyinRow: true,
                    }
                });
            }
            if (((game.scoreP2 === 0) || (game.scoreP1 === 0)) && winner.achAce === false) {
                await this.prisma.user.update({
                    where: {
                        idIntra: body.winner
                    },
                    data: {
                        achAce: true,
                    }
                });
            }
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    sum(a, b) {
        return a + b;
    }
    minus(a, b) {
        return a - b;
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
    async getGameHistory(body, userId) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                },
            });
            const gameHistory = await this.prisma.games.findMany({
                where: {
                    OR: [
                        {
                            user1: user.idIntra
                        },
                        {
                            user2: user.idIntra
                        }
                    ]
                },
                orderBy: {
                    startedAt: 'desc'
                }
            });
            const gameHistoryplusimg = await Promise.all(gameHistory.map(async (game) => {
                const userToGetImg1 = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        idIntra: game.user1
                    },
                    select: {
                        img: true
                    }
                });
                const userToGetImg2 = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        idIntra: game.user2
                    },
                    select: {
                        img: true
                    }
                });
                return Object.assign(Object.assign({}, game), { img1: userToGetImg1.img, img2: userToGetImg2.img });
            }));
            return gameHistoryplusimg;
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