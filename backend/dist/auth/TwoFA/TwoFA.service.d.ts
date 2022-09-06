import { Response } from 'express';
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class TwoFactorAuthenticationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateTwoFactorAuthenticationSecret(user: User): Promise<{
        secret: string;
        otpAuthURL: string;
    }>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
    isTwoFaCodeValid(twofaCode: string, user: User): boolean;
}
