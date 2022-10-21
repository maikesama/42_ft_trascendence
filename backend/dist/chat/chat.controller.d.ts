import { ChatService } from './chat.service';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    newChannel(body: any, req: any): Promise<void>;
    newDm(body: any, req: any): Promise<void>;
    searchUser(body: any, req: any): Promise<any[]>;
    muteUser(body: any, req: any): Promise<void>;
    unmuteUser(body: any, req: any): Promise<void>;
    banUser(body: any, req: any): Promise<void>;
    unbanUser(body: any, req: any): Promise<void>;
    joinChannel(body: any, req: any): Promise<void>;
    leaveChannel(body: any, req: any): Promise<void>;
    changePassword(body: any, req: any): Promise<void>;
    changeVisibility(body: any, req: any): Promise<void>;
    addUser(body: any, req: any): Promise<void>;
    removeUser(body: any, req: any): Promise<void>;
    addAdmin(body: any, req: any): Promise<void>;
    removeAdmin(body: any, req: any): Promise<void>;
    getChannels(req: any): Promise<Promise<{
        name: any;
        type: any;
        id: any;
    }>[]>;
    getChatUsers(body: any, req: any): Promise<Promise<{
        idIntra: string;
        img: string;
    }>[]>;
}
