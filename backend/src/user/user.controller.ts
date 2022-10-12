import {Controller, Get, UseGuards, Req, Bind, Param, Post, Body} from "@nestjs/common";
import { AtGuard } from "src/auth/guards";
import {JwtService} from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { bindCallback } from "rxjs";
import { TwoFactorAuthenticationService} from './../auth/TwoFA/TwoFA.service'
import { MessageBody } from "@nestjs/websockets";

@Controller('user')
export class UserController{
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private userservice: UserService,
        private twofa: TwoFactorAuthenticationService) {}

    @UseGuards(AtGuard)
    @Get('me')
    async getMe(@Req() req)
    {
        const user = req.user
        return await this.userservice.getProfile(user['sub'])
    }

    @UseGuards(AtGuard)
    @Get(':idIntra')
    @Bind(Param('idIntra'))
    async getUserProfile(idIntra, @Req() req)
    {
       const user = req.user
       return await this.userservice.getUserProfile(idIntra, user['sub'])
    }

    @UseGuards(AtGuard)
    @Get('all')
    async getAllUsers()
    {
        return await this.userservice.getAllUsers()
    }

    @UseGuards(AtGuard)
    @Post('block/:idIntra')
    @Bind(Param('idIntra'))
    async blockUser(idIntra, @Req() req)
    {
       const user = req.user
       return await this.userservice.block(idIntra, user['sub'])
    }

    @UseGuards(AtGuard)
    @Post('unblock/:idIntra')
    @Bind(Param('idIntra'))
    async unblockUser(idIntra, @Req() req)
    {
       const user = req.user
       return await this.userservice.unblock(idIntra, user['sub'])
    }

    @UseGuards(AtGuard)
    @Get('turn-on-2fa')
    async turnOn2fa(@Req() req)
    {
        const user = req.user
        console.log(user)
        return await this.twofa.turnOnTwoFa(user['sub'])
    }

    @UseGuards(AtGuard)
    @Get('turn-off-2fa')
    async turnOff2fa(@Req() req)
    {
        const user = req.user
        return await this.userservice.turnOffTwoFa(user['sub'])
    }

    @UseGuards(AtGuard)
    @Post('update/pp')
    async changePP(@Body() body, @Req() req)
    {
        const user = req.user
        return await this.userservice.changepp(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @Post('update/username')
    async changeusername(@Body() body, @Req() req)
    {
        const user = req.user
        return await this.userservice.changepp(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @Post('getUserChat')
    async getUserChat(@Req() req)
    {
        const user = req.user
        return await this.userservice.getChats(user['sub'])
    }
}