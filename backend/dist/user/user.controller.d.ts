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
    getAllUsers(): Promise<{
        id: number;
        partecipant: import(".prisma/client").Partecipant[];
        idIntra: string;
        userName: string;
        img: string;
        friend: import(".prisma/client").Friend[];
        friendBy: import(".prisma/client").Friend[];
        blocked: import(".prisma/client").Blocklist[];
        blockedby: import(".prisma/client").Blocklist[];
        invited: import(".prisma/client").Invited[];
        invitedBy: import(".prisma/client").Invited[];
        messages: import(".prisma/client").Message[];
        email: string;
        tel: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        winRow: number;
        win: number;
        loss: number;
        rank: number;
    }[]>;
    blockUser(idIntra: any, req: any): Promise<void>;
    unblockUser(idIntra: any, req: any): Promise<void>;
    turnOn2fa(req: any): Promise<void>;
    turnOff2fa(req: any): Promise<void>;
    changePP(body: any, req: any): Promise<void>;
    changeusername(body: any, req: any): Promise<void>;
    getBlocked(req: any): Promise<{
        idIntra: string;
        img: string;
    }[]>;
    getUserProfile(idIntra: any, req: any): Promise<import(".prisma/client").User>;
}
