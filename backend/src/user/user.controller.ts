import {Controller, Get, UseGuards, Req} from "@nestjs/common";
import { AtGuard } from "src/auth/guards";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('user')
export class UserController{
    constructor(private prisma: PrismaService) {}

    @Get()
    @UseGuards(AtGuard)
    async getInfo(@Req() req)
    {
        let user = this.prisma.user.findUnique({
            where: {
                id : req.id
            }
        })

        return user
    }
}