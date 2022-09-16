import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getProfile(Id: number): Promise<import(".prisma/client").User>;
    getUserProfile(idintra: string): Promise<import(".prisma/client").User>;
    getAllUsers(): Promise<{
        idIntra: string;
        userName: string;
        img: string;
        win: number;
        loss: number;
        rank: number;
    }[]>;
}
