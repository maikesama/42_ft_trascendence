import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';
import { AtGuard } from './auth/guards';
import { Cache, caching } from 'cache-manager';
// import { SessionService } from './sessionHandler/session.service';

@WebSocketGateway({transports: ['websocket'] ,cors: true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private prisma: PrismaService, private chat: ChatService,
  //    @Inject(CACHE_MANAGER) private cacheManager : Cache, private sessionService: SessionService
  //    ){
  //   this.sessionService = new SessionService(this.cacheManager);
  // }
  ){}
  
  @WebSocketServer() server: Server;
  
  private logger: Logger = new Logger('AppGateway')
  
  afterInit(server: any) {
    this.logger.log('initialized')
  }

  @UseGuards(AtGuard)
  OnGatewayConnection(client: Socket, ...args: any[]) {
    console.log(client['sub']['id'])
    this.logger.log(`Client connected: ${client.id}`)
  }

  OnGatewayDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  OnGatewayInit(server: any) {
    this.logger.log('initialized')
  }
  
  
  @UseGuards(AtGuard)
  async handleConnection(client: Socket,  @Req() req, ...args: any[]) {
    // try
    // {
    //   const user = req.user;
    //   const me = await this.prisma.user.findUniqueOrThrow({
    //     where: {
    //       id: user['sub']
    //     },
    //   })
    //   let session = await this.sessionService.findSession(me.idIntra);
    //   if (session && session.status !== 'offline') {
    //     client.emit('alreadyLoggedIn', 'Already logged in');
    //     client.to(session.socketId).emit('alreadyLoggedIn', 'Already logged in');
    //     return ;
    //   }
    //   else {
    //     await this.sessionService.saveSession(me.idIntra, {
    //       status: 'online',
    //       socketId: client.id,
    //     });
    //     (client as any).idIntra = me.idIntra;
    //     console.log((client as any).idIntra)
    //     let chats = await this.prisma.partecipant.findMany({
    //       where: {
    //         idIntra: me.idIntra
    //       },
    //     });
    //     await Promise.all(chats.map(async (chat) => {
    //       client.join(chat.idChat.toString());
    //     }))
    //   }

    // }
    // catch(e: any)
    // {
    //   throw new BadRequestException(e)
    // }
  }

  handleDisconnect(client: Socket) {
    // this.sessionService.saveSession((client as any).idIntra, {
    //       status: "offline",
    //       socketId: client.id
    //   });
    //   this.server.sockets.emit("offline", client.handshake.query.auth)
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
