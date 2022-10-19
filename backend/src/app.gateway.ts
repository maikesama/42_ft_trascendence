import { Logger, BadRequestException } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';

@WebSocketGateway({cors: true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private prisma: PrismaService, private chat: ChatService){}
  
  @WebSocketServer() server: Server;
  
  private logger: Logger = new Logger('AppGateway')
  
  afterInit(server: any) {
    this.logger.log('initialized')
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    const sockets = this.server.sockets.sockets
    this.logger.log(`Client connected: ${client.id}`)
    this.logger.log(`Total clients: ${sockets.size}`)
  }

  handleDisconnect(client: Socket) {
    const sockets = this.server.sockets.sockets
    this.logger.log(`Client disconnected: ${client.id}`)
    this.logger.log(`Total clients: ${sockets.size}`)
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

  clientToUser = {}

  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name

    return Object.values(this.clientToUser)
  }

  getClientName(clientId: string){
    return this.clientToUser[clientId]
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

  @SubscribeMessage('findAllMessages')
  async findAllMessages(client: Socket, idChat: number) {
    try{
      const messages = await this.prisma.message.findMany({
        where: {
          idChat: idChat
        }
      })
      //client.emit('allMessages', messages)
      return messages
    }
    catch (e) {
      throw new BadRequestException(e)
    }
  
  }

  @SubscribeMessage('joinChat')
  async handleJoin(@ConnectedSocket() client: Socket,message:{ sender: string, idChat: number, text: string}) {
  
    return this.identify(message.sender, client.id)
  }

  @SubscribeMessage('typing')
  async handleTyping(@MessageBody('isTyping') isTyping: boolean ,client: Socket, idChat: number) {
      const name = await this.getClientName(client.id)

      client.broadcast.emit('typing', {isTyping, name})

  }

}
