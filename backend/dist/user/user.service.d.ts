import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getProfile(Id: number): Promise<import(".prisma/client").User>;
    getUserProfile(idintra: string, requestedBy: number): Promise<import(".prisma/client").User>;
    checkIfBlocked(idintra: string, requestIdIntra: string): Promise<boolean>;
    getAllUsers(): Promise<import(".prisma/client").User[]>;
    deleteSecrets(user: any): any;
    block(idintra: string, requestId: number): Promise<void>;
    unblock(idintra: string, requestId: number): Promise<void>;
    turnOffTwoFa(Id: number): Promise<void>;
    changepp(body: any, id: number): Promise<void>;
    changeUserName(body: any, id: number): Promise<void>;
    getChats(id: number): Promise<any[]>;
    showChat(idChat: number): Promise<any>;
}
