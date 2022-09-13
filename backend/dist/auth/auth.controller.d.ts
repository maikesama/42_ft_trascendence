import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { Response } from 'express';
import { TwoFactorAuthenticationService } from "./TwoFA/TwoFA.service";
export declare class AuthController {
    private readonly prisma;
    private authservice;
    private twoFaService;
    constructor(prisma: PrismaService, authservice: AuthService, twoFaService: TwoFactorAuthenticationService);
    login(res: any): any;
    getAuthCode(query: string, res: any): void;
    status(): {
        msg: string;
    };
    logout(res: Response): void;
    complete2fa(id: any): Promise<{
        QRcode: string;
    }>;
    verify2fa(body: any, res: Response): Promise<void>;
    turnOn2fa(body: any): Promise<void>;
}
