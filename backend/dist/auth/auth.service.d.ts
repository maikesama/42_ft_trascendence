import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getAuthCode(query: string, res: Response): Promise<void>;
    checkUsername(username: string): any;
    private getToken;
    hashData(data: string): Promise<string>;
    generateJwtTokens(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
