import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from 'express';
export declare class AuthController {
    private readonly prisma;
    private authservice;
    constructor(prisma: PrismaService, authservice: AuthService);
    login(res: any): any;
    getAuthCode(query: string, res: any): void;
    status(): {
        msg: string;
    };
    sendId(res: any): void;
    logout(req: Request): Promise<void>;
    refresh(req: Request): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
