import {Controller, Get, UseGuards, Req} from "@nestjs/common";
import { AtGuard } from "src/auth/guards";
import {JwtService} from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private userservice: UserService) {}

    @UseGuards(AtGuard)
    Get('me')
    async getMe(@Req() req)
    {
        const data = await this.jwt.verifyAsync(req.cookies['at'])
        return await this.userservice.getProfile(data['id'])
    }

}