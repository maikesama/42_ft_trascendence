import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getBlocked(userId: number): Promise<{
        idIntra: string;
        img: string;
    }[]>;
    getProfile(Id: number): Promise<import(".prisma/client").User>;
    getUserProfile(idintra: string, requestedBy: number): Promise<import(".prisma/client").User>;
    checkIfBlocked(idintra: string, requestIdIntra: string): Promise<boolean>;
    getAllUsers(): Promise<{
        blocked: import(".prisma/client").Blocklist[];
        friend: import(".prisma/client").Friend[];
        friendBy: import(".prisma/client").Friend[];
        idIntra: string;
        img: string;
        id: number;
        userName: string;
        email: string;
        tel: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        winRow: number;
        win: number;
        loss: number;
        rank: number;
        blockedby: import(".prisma/client").Blocklist[];
        invited: import(".prisma/client").Invited[];
        invitedBy: import(".prisma/client").Invited[];
        partecipant: import(".prisma/client").Partecipant[];
        messages: import(".prisma/client").Message[];
    }[]>;
    block(idintra: string, requestId: number): Promise<void>;
    unblock(idintra: string, requestId: number): Promise<void>;
    turnOffTwoFa(Id: number): Promise<void>;
    changepp(body: any, id: number): Promise<void>;
    changeUserName(body: any, id: number): Promise<void>;
    getChats(id: number): Promise<any[]>;
    showChat(idChat: number): Promise<any>;
}
