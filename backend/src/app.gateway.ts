import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';
import { AtGuard } from './auth/guards';

import { Cache, caching } from 'cache-manager';
import { UserService } from './user/user.service';
// import { SessionService } from './sessionHandler/session.service';

var jwt = require('jsonwebtoken');
var users = new Map<string, string>();
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
      users.set(user.idIntra, client.id);
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
        if (!await this.chat.isAlreadyIn(message.idChat, user.idIntra))
          throw new BadRequestException("You are not in this chat")
        else if (await this.chat.isBanned(message.idChat, user.idIntra))
        {
          console.log("banned banned banned banned")
          client.emit('provaMessaggi', {errorMessage: "sei bannato vai via ", idChat : message.idChat})
          //capire se tenere chat bannate
        }
        else if (await this.chat.isMuted(message.idChat, user.idIntra))
        {
          console.log("muted muted muted muted")
          const muted = await this.chat.getMuted({id: message.idChat}, user.idIntra)
          const now = new Date();
          const diff = muted[0].time - now.getTime();
          const minutes = Math.floor(diff / 60000);
          const messageError = "devi stare MUTOOOO ancora per " + minutes + " minuti"
          client.emit('provaMessaggi', {errorMessage: messageError, idChat : message.idChat})
          //prendere tempo di mute
        }
        else {
          console.log("messaggio messaggio messaggio messaggio")
          this.saveMessage( user.idIntra, message.idChat, message.message)
          this.server.to(message.idChat.toString()).emit('provaMessaggi', {message : message.message, idIntra : user.idIntra, sendedAt : date, idChat : message.idChat, users: { userName : user.userName, img : user.img}})
        }
      }
      else
        throw new BadRequestException("idChat or message not found")


    }
    else
      throw new BadRequestException("Unauthorized")
  }

  @UseGuards(AtGuard)
  @SubscribeMessage('provaJoin')
  async provaJoin(client: Socket, message: { idChat: number }) {
    console.log("ciaooosjdsjjdnnjasndnjasdnjansj")
    const user = await this.wsGuard(client)
    //controllare se l'utente va bene
    //nickname ? o idIntra ?
    if (user) {
      if (message.idChat) {
        if (!await this.chat.isAlreadyIn(message.idChat, user.idIntra)) // controllare se l'utente è già in chat in db
          throw new BadRequestException("You are not in this chat")
        else if (await this.chat.isBanned(message.idChat, user.idIntra))
        {
          throw new BadRequestException("sei bannato vai via ")
        }
        else
        {
          console.log("provaJoin", message)
          client.join(message.idChat.toString())
        }
      }
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@SubscribeMessage('notification')
async notification(client: Socket, message: { type: number, idIntra: string }) {
  const user = await this.wsGuard(client)
  if (user && message && message.type && message.idIntra && user.idIntra != message.idIntra) {
    const user2 = await this.userService.getUserByIdIntra(message.idIntra)
    if (user2) {
      console.log("notification", message)
      if (message.type == 1) {
        //friend request
      }
      else if (message.type == 2) {
        //game invite
        if (users.has(message.idIntra)) {
          this.server.to(users.get(message.idIntra)).emit('notify', { type: 2, idIntra: user.idIntra, userName: user.userName, img: user.img })
        }
      }
    }
  }
}

@SubscribeMessage('declineGame')
async declineGame(client: Socket, message: { idIntra: string }) {
  const user = await this.wsGuard(client)
  if (user && message && message.idIntra && user.idIntra != message.idIntra) {
    const user2 = await this.userService.getUserByIdIntra(message.idIntra)
    if (user2) {
      if (users.has(message.idIntra)) {
        this.server.to(users.get(message.idIntra)).emit('declineGame', { idIntra: user.idIntra })
      }
    }
  }
}

@SubscribeMessage('trigger')
async trigger(client: Socket) {
  const user = await this.wsGuard(client)
  if (user) {
    this.server.emit('trigger')
  }
}

  async handleDisconnect(client: Socket) {
    const user = await this.wsGuard(client)
    if (user) {
      users.delete(user.idIntra);
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


  async saveMessage( idIntra: string, idChat: number, message: string) {
    try {
      const newMessage = await this.prisma.message.create({
        data: {
          idChat: idChat,
          idIntra: idIntra,
          message: message
        }
      })
      return newMessage
    }
    catch (e: any) {
      return false
    }
  }

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
