import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
export declare class UserController {
    private prisma;
    private jwt;
    private userservice;
    constructor(prisma: PrismaService, jwt: JwtService, userservice: UserService);
    getMe(req: any): Promise<void>;
}
