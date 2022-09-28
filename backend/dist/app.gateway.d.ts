import { OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AppGateway implements OnGatewayInit {
    wss: typeof Server;
    private logger;
    afterInit(server: any): void;
    handleMessage(client: Socket, payload: any): void;
}
