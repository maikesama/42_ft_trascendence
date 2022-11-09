import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';
import { AtGuard } from './auth/guards';

import { Cache, caching } from 'cache-manager';
import { UserService } from './user/user.service';
// import { SessionService } from './sessionHandler/session.service';

var jwt = require('jsonwebtoken');

@UseGuards(AtGuard)
@WebSocketGateway(4243, { transports: ['websocket'] })
export class AppGateway implements OnGatewayInit {
  constructor(private prisma: PrismaService, private chat: ChatService, private userService: UserService) { }

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: any) {
    this.logger.log('initialized')
  }

  // @UseGuards(AtGuard)
  // OnGatewayConnection(client: Socket, ...args: any[]) {
  //   this.logger.log(`Client connected: ${client.id}`)
  // }

  // OnGatewayDisconnect(client: Socket) {
  //   this.logger.log(`Client disconnected: ${client.id}`)
  // }

  OnGatewayInit(server: any) {
    this.logger.log('initialized')
  }

  async wsGuard(req: Socket) {

    try {
      let token = null;

      if (req.handshake && req.handshake.headers && req.handshake.headers.cookie) {
        var cookies: any = req.handshake.headers.cookie;
        cookies = cookies.split(';');
        cookies.forEach(function (cookie) {
          var parts = cookie.split('=');
          if (parts[0].trim() === 'at')
            token = parts[1].trim();
        });
      }
      // if (token)
      // {
        const payload = this.verifyId(token)
        if (payload)
        {
          const user = await this.userService.verifyUserByIdIntra(payload['idIntra'])
          if (user)
          {
            // console.log("user", user)
            return user
          }
        }
      // }
      // else
      //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    }
    catch (e) {
      // console.log(e)
      // throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); da capire come gestire
    }
    return null
  }

  verifyId(token: string) {
    const user = jwt.verify(token,  process.env.AtSecret );
    if (user)
      return user;
  }

  @UseGuards(AtGuard)
  async handleConnection(client: Socket, ...args: any[]) {

    const user = await this.wsGuard(client)
    if (user) {
      if (await this.userService.changeUserStatus(user.idIntra, 1))
        // this.server.emit('status', { idIntra: user.idIntra, status: 1 })
        this.server.emit('trigger')

    }


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

//prova
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @UseGuards(AtGuard)
  @SubscribeMessage('prova')
  async prova(client: Socket, message: { idChat: number, message: string }) {
    const user = await this.wsGuard(client)
    if (user) {
      console.log("provaMessaggi", message)
      if (message.idChat && message.message) {
        const date = new Date()
        this.server.to(message.idChat.toString()).emit('provaMessaggi', {message : message.message, idIntra : user.idIntra, sendedAt : date, idChat : message.idChat, users: { userName : user.userName}})
      }
      

    }
  }

  @UseGuards(AtGuard)
  @SubscribeMessage('provaJoin')
  async provaJoin(client: Socket, message: { idChat: number }) {
    console.log("ciaooosjdsjjdnnjasndnjasdnjansj")
    const user = await this.wsGuard(client)
    //controllare se l'utente va bene
    //nickname ? o idIntra ?
    if (user) {
      console.log("provaJoin", message)
      client.join(message.idChat.toString())
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async handleDisconnect(client: Socket) {
    const user = await this.wsGuard(client)
    if (user) {
      if (await this.userService.changeUserStatus(user.idIntra, 0))
      {
        // this.server.emit('status', { idIntra: user.idIntra, status: 0 })
        this.server.emit('trigger')
      }
    }
    // this.sessionService.saveSession((client as any).idIntra, {
    //       status: "offline",
    //       socketId: client.id
    //   });
    //   this.server.sockets.emit("offline", client.handshake.query.auth)
  }

  // async verifyPartecipant(idIntra: string, idChat: number) {
  //   try {
  //     const partecipant = await this.prisma.partecipant.findUnique({
  //       where: {
  //         idIntra_idChat: { idIntra, idChat }
  //       }
  //     })
  //     return partecipant
  //   }
  //   catch (e: any) {
  //     return false
  //   }
  // }

  // async isChatAdmin(idIntra: string, idChat: number) {
  //   try {
  //     const partecipant = await this.prisma.partecipant.findUnique({
  //       where: {
  //         idIntra_idChat: { idIntra, idChat }
  //       }
  //     })
  //     return partecipant.admin
  //   }
  //   catch (e: any) {
  //     return false
  //   }
  // }

  // async saveMessage(message: { sender: string, idChat: number, text: string }) {
  //   try {
  //     const newMessage = await this.prisma.message.create({
  //       data: {
  //         idChat: message.idChat,
  //         idIntra: message.sender,
  //         message: message.text
  //       }
  //     })
  //     return newMessage
  //   }
  //   catch (e: any) {
  //     return false
  //   }
  // }

  // clientToUser = {}

  // identify(name: string, clientId: string) {
  //   this.clientToUser[clientId] = name

  //   return Object.values(this.clientToUser)
  // }

  // getClientName(clientId: string) {
  //   return this.clientToUser[clientId]
  // }

  // @SubscribeMessage('msgToServer')
  // async handleMessage(client: Socket, message: { sender: string, idChat: number, text: string }): Promise<void> {
  //   try {

  //     const chat = await this.prisma.chat.findUniqueOrThrow({
  //       where: {
  //         id: message.idChat
  //       }
  //     })

  //     if (await this.chat.isMuted(chat.name, message.sender))
  //       throw new BadRequestException("You are muted from this chat")
  //     if (await this.chat.isBanned(chat.name, message.sender))
  //       throw new BadRequestException("You are banned from this chat")
  //     if (!await this.verifyPartecipant(message.sender, message.idChat))
  //       throw new BadRequestException("You are not partecipant of this chat")
  //     //need to save messages and notify other partecipants

  //     await this.saveMessage(message);
  //     this.server.to(message.idChat.toString()).emit('msgToClient', message);
  //   }
  //   catch (e) {
  //     throw new BadRequestException(e)
  //   }


  // }

  // @SubscribeMessage('findAllMessages')
  // async findAllMessages(client: Socket, idChat: number) {
  //   try {
  //     const messages = await this.prisma.message.findMany({
  //       where: {
  //         idChat: idChat
  //       }
  //     })
  //     //client.emit('allMessages', messages)
  //     return messages
  //   }
  //   catch (e) {
  //     throw new BadRequestException(e)
  //   }

  // }

  // @SubscribeMessage('joinChat')
  // async handleJoin(@ConnectedSocket() client: Socket, message: { sender: string, idChat: number, text: string }) {

  //   return this.identify(message.sender, client.id)
  // }

  // @SubscribeMessage('typing')
  // async handleTyping(@MessageBody('isTyping') isTyping: boolean, client: Socket, idChat: number) {
  //   const name = await this.getClientName(client.id)

  //   client.broadcast.emit('typing', { isTyping, name })

  // }

}
