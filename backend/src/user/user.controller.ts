import {Controller, Get, UseGuards, Req, Bind, Param} from "@nestjs/common";
import { AtGuard } from "src/auth/guards";
import {JwtService} from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { bindCallback } from "rxjs";

@Controller('user')
export class UserController{
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private userservice: UserService) {}

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
    async getUserProfile(idIntra)
    {
       return await this.userservice.getUserProfile(idIntra)
    }

    @UseGuards(AtGuard)
    @Get('all')
    async getAllUsers()
    {
        return await this.userservice.getAllUsers()
    }

}