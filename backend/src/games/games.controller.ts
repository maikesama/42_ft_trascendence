import { Controller, Post, Body, Req, UseGuards, HttpCode, Get } from '@nestjs/common'
import { AtGuard } from 'src/auth/guards';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController{
    constructor(private GamesService: GamesService){}

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('createGame')
    async createGame(@Body() body, @Req() req){
        const user = req.user
        return await this.GamesService.createGame(body)
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('updateGame')
    async updateGame(@Body() body, @Req() req){
        const user = req.user
        return await this.GamesService.updateGame(body)
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Get('getLeaderboard')
    async getLeaderboard(@Body() body, @Req() req){
        const user = req.user
        return await this.GamesService.getLeaderboard(body)
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getPlayerRank')
    async getPlayerProfile(@Body() body, @Req() req){
        const user = req.user
        if (body['idIntra'] !== undefined)
            user['idIntra'] = body['idIntra'];
        return await this.GamesService.getPlayerProfile(body, user['idIntra'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getHistory')
    async getGameHistory(@Body() body, @Req() req){
        const user = req.user
        if (body['idIntra'] !== undefined)
            user['idIntra'] = body['idIntra'];
        return await this.GamesService.getGameHistory(body, user['idIntra'])
    }

}
