import { Logger, BadRequestException } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';

@WebSocketGateway({cors: true})
export class AppGateway implements OnGatewayInit {
  constructor(private prisma: PrismaService, private chat: ChatService){}

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
      return partecipant 
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

  async saveMessage(message: {sender: string, idChat: number, text: string})
  {
    try{
      const newMessage = await this.prisma.message.create({
        data: {
          idChat: message.idChat,
          idIntra: message.sender,
          message: message.text
        }
      })
      return newMessage
    }
    catch(e: any)
    {
      return false
    }
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, message:{ sender: string, idChat: number, text: string} ): Promise<void> {
    try{

      const chat = await this.prisma.chat.findUniqueOrThrow({
        where: {
          id: message.idChat
        }
      })

      if (await this.chat.isMuted(chat.name, message.sender))
        throw new BadRequestException("You are muted from this chat")
      if (await this.chat.isBanned(chat.name, message.sender))
        throw new BadRequestException("You are banned from this chat")
      if (!await this.verifyPartecipant(message.sender, message.idChat)) 
        throw new BadRequestException("You are not partecipant of this chat")
      //need to save messages and notify other partecipants

      await this.saveMessage(message);
      this.server.to(message.idChat.toString()).emit('msgToClient', message);
    }
    catch (e) {
      throw new BadRequestException(e)
    }

    
  }
}
