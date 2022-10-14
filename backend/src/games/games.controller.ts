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
    @Get('getPlayerProfile')
    async getWinner(@Body() body, @Req() req){
        const user = req.user
        return await this.GamesService.getPlayerProfile(body)
    }

}