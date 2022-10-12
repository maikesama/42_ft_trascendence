import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    searchUser(body: any, userId: number): Promise<{
        idIntra: String;
    }[]>;
    newDm(body: any, userId: number): Promise<void>;
    newChannel(body: any, userId: number): Promise<void>;
    lastAdminLeft(body: any, userId: number): Promise<boolean>;
    destroyChannel(body: any, userId: number): Promise<void>;
    isBanned(name: string, idIntra: string): Promise<boolean>;
    isMuted(name: string, idIntra: string): Promise<boolean>;
    muteUser(body: any, userId: number): Promise<void>;
    isAlreadyIn(name: string, idIntra: string): Promise<boolean>;
    isAdmin(name: string, userId: number): Promise<boolean>;
    changePassword(body: any, userId: number): Promise<void>;
    changeVisibility(body: any, userId: number): Promise<void>;
    joinChannel(body: any, userId: number): Promise<void>;
    unMuteUser(body: any, userId: number): Promise<void>;
    unBanUser(body: any, userId: number): Promise<void>;
    leaveChannel(body: any, userId: number): Promise<void>;
    banUser(body: any, userId: number): Promise<void>;
    addUser(body: any, userId: number): Promise<void>;
    removeUser(body: any, userId: number): Promise<void>;
    addAdmin(body: any, userId: number): Promise<void>;
    removeAdmin(body: any, userId: number): Promise<void>;
}
