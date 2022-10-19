import { PrismaService } from 'src/prisma/prisma.service';
export declare class FriendService {
    private prisma;
    constructor(prisma: PrismaService);
    isFriend(userId: string, friendId: string): Promise<boolean>;
    isInvited(reqIdIntra: string, toAddIdIntra: string): Promise<boolean>;
    inviteFriend(body: any, userId: number): Promise<void>;
    removeInvite(body: any, userId: number): Promise<void>;
    acceptInvite(body: any, userId: number): Promise<void>;
    declineInvite(body: any, userId: number): Promise<void>;
    getFriends(body: any, userId: number): Promise<{
        idIntra: string;
        userName: string;
        img: string;
    }[]>;
    removeFriend(body: any, userId: number): Promise<void>;
}
