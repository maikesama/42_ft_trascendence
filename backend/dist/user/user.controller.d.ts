import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { TwoFactorAuthenticationService } from './../auth/TwoFA/TwoFA.service';
export declare class UserController {
    private prisma;
    private jwt;
    private userservice;
    private twofa;
    constructor(prisma: PrismaService, jwt: JwtService, userservice: UserService, twofa: TwoFactorAuthenticationService);
    getMe(req: any): Promise<import(".prisma/client").User>;
    getUserProfile(idIntra: any, req: any): Promise<import(".prisma/client").User>;
    getAllUsers(): Promise<import(".prisma/client").User[]>;
    blockUser(idIntra: any, req: any): Promise<void>;
    unblockUser(idIntra: any, req: any): Promise<void>;
    turnOn2fa(req: any): Promise<void>;
    turnOff2fa(req: any): Promise<void>;
    changePP(body: any, req: any): Promise<void>;
    changeusername(body: any, req: any): Promise<void>;
    getUserChat(req: any): Promise<any[]>;
}
