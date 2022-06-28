import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
export declare class AuthController {
    private readonly prisma;
    private authservice;
    constructor(prisma: PrismaService, authservice: AuthService);
    login(res: any): any;
    getAuthCode(query: string, res: any): void;
    private getToken;
    logout(): void;
}
