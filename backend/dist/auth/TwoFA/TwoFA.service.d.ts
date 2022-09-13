import { Response } from 'express';
import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "../auth.service";
export declare class TwoFactorAuthenticationService {
    private prisma;
    private authservice;
    constructor(prisma: PrismaService, authservice: AuthService);
    turnOnTwoFa(id: number): Promise<void>;
    complete2fa(body: any): Promise<string>;
    verify2fa(body: any, res: Response): Promise<Boolean>;
}
