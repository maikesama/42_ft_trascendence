import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: any) {
    this.logger.log('initialized')
  }

  async verifyPartecipant(idIntra: string, idChat: number) {
    try{
      const partecipant = await this.prisma.partecipant.findUnique({
        where: {
          idIntra_idChat: {idIntra, idChat}
        }
      })
      return partecipant && !partecipant.muted
    }
    catch(e: any)
    {
      return false
    }
  }

  async isChatAdmin(idIntra: string, idChat: number){
    try{
      const partecipant = await this.prisma.partecipant.findUnique({
        where: {
          idIntra_idChat: {idIntra, idChat}
        }
      })
      return partecipant.admin
    }
    catch(e: any)
    {
      return false
    }
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, message:{ sender: string, room: string, message: string} ): void {
    try{
      if (!(await this.verifyPartecipant(client.idIntra, Number(message.room))))
      return ;

      //need to save messages and notify other partecipants

      this.server.to(message.room).emit('msgToClient', message)
    }
    catch (e) {
      console.log("error: ", e.message)
    }

    
  }
}
