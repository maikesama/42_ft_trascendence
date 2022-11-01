import { ChatService } from './chat.service';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    newChannel(body: any, req: any): Promise<void>;
    getUserPrivilegeInfo(body: any, req: any): Promise<{
        owner: boolean;
        admin: boolean;
    }>;
    newDm(body: any, req: any): Promise<void>;
    searchUser(body: any, req: any): Promise<any[]>;
    searchGeneral(body: any, req: any): Promise<any[] | {
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
    muteUser(body: any, req: any): Promise<void>;
    unmuteUser(body: any, req: any): Promise<void>;
    banUser(body: any, req: any): Promise<void>;
    unbanUser(body: any, req: any): Promise<void>;
    joinChannel(body: any, req: any): Promise<void>;
    getBanned(body: any, req: any): Promise<{
        idIntra: any;
        userName: string;
        img: string;
    }[]>;
    getMuted(body: any, req: any): Promise<{
        idIntra: any;
        userName: string;
        img: string;
    }[]>;
    getAdmin(body: any, req: any): Promise<{
        idIntra: any;
        userName: string;
        img: string;
    }[]>;
    leaveChannel(body: any, req: any): Promise<void>;
    changePassword(body: any, req: any): Promise<void>;
    changeVisibility(body: any, req: any): Promise<void>;
    addUser(body: any, req: any): Promise<void>;
    removeUser(body: any, req: any): Promise<void>;
    addAdmin(body: any, req: any): Promise<void>;
    removeAdmin(body: any, req: any): Promise<void>;
    getChannels(req: any): Promise<{
        name: any;
        type: any;
        id: any;
    }[]>;
    getChanUsers(body: any, req: any): Promise<{
        me: {
            owner: boolean;
            admin: boolean;
        };
        partecipants: {
            idIntra: any;
            userName: string;
            img: string;
            owner: any;
            admin: any;
            mutedUntil: any;
            muted: boolean;
        }[];
    }>;
    getChatUsers(body: any, req: any): Promise<import(".prisma/client").Chat[]>;
}
