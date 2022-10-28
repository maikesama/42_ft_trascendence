import { FriendService } from './friend.service';
export declare class FriendController {
    private friendService;
    constructor(friendService: FriendService);
    inviteFriend(body: any, req: any): Promise<void>;
    acceptInvite(body: any, req: any): Promise<void>;
    declineInvite(body: any, req: any): Promise<void>;
    removeInvite(body: any, req: any): Promise<void>;
    getFriends(body: any, req: any): Promise<{
        idIntra: string;
        userName: string;
        img: string;
    }[]>;
    getInvite(req: any): Promise<{
        idIntra: string;
        img: string;
    }[]>;
    getInvitedByMe(req: any): Promise<{
        idIntra: string;
        img: string;
    }[]>;
    removeFriend(body: any, req: any): Promise<void>;
}
