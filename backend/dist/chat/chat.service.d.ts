import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getChannels(userId: number): Promise<{
        name: any;
        type: any;
        id: any;
    }[]>;
    getChatUsers(body: any, userId: number): Promise<import(".prisma/client").Chat[]>;
    searchUser(body: any, userId: number): Promise<any[]>;
    newDm(body: any, userId: number): Promise<void>;
    isChanOwner(idChat: number, idIntra: string): Promise<boolean>;
    searchGeneral(body: any, userId: number): Promise<any[] | {
        users: {
            idIntra: string;
            img: string;
        }[];
        channels: {
            name: string;
            type: string;
            id: number;
        }[];
    }>;
    newChannel(body: any, userId: number): Promise<void>;
    getUserPrivilegeInfo(body: any, userId: number): Promise<{
        owner: boolean;
        admin: boolean;
    }>;
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
