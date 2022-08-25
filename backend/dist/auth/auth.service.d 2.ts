import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getAuthCode(query: string, res: Response): Promise<void>;
    private getToken;
    hashData(data: string): Promise<string>;
    generateJwtTokens(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    logout(userId: number): Promise<void>;
    refreshTok(userId: number, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
