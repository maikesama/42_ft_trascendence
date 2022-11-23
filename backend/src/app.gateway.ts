import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsException,  WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';
import { AtGuard } from './auth/guards';

import { Cache, caching } from 'cache-manager';
import { UserService } from './user/user.service';
import { FriendService } from './friend/friend.service';
// import { SessionService } from './sessionHandler/session.service';

var jwt = require('jsonwebtoken');
var users = new Map<string, any>();
@UseGuards(AtGuard)
@WebSocketGateway(4243, { transports: ['websocket'] })
export class AppGateway implements OnGatewayInit {
  constructor(private prisma: PrismaService, private chat: ChatService, private userService: UserService, private friendSerice : FriendService
    ) { }

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
      //   throw new WsException('Unauthorized', HttpStatus.UNAUTHORIZED);

    }
    catch (e) {
      // console.log(e)
      // throw new WsException('Unauthorized', HttpStatus.UNAUTHORIZED); da capire come gestire
    }
    return null
  }

  verifyId(token: string) {
    const user = jwt.verify(token,  process.env.AtSecret );
    if (user)
      return user;
  }

  async sendToFriends(idIntra: string, status: number) {
    await this.friendSerice.getFriends({}, idIntra).then((friends) => {
      friends.forEach((friend) => {
        if (users.has(friend.idIntra)) {
          this.server.to(users.get(friend.idIntra).id).emit('friendStatus', { idIntra: idIntra, status: status })
        }
      })
    })
  }

  @UseGuards(AtGuard)
  async handleConnection(client: Socket, ...args: any[]) {

    const user = await this.wsGuard(client)
    if (user) {
      users.set(user.idIntra, client);
      if (await this.userService.changeUserStatus(user.idIntra, 1))
      {
        // this.server.emit('status', { idIntra: user.idIntra, status: 1 })
        this.server.emit('trigger')
        await this.sendToFriends(user.idIntra, 1)
      }
    }

  }

  @SubscribeMessage('inGame')
  async inGame(client: Socket, n : number) {
    const user = await this.wsGuard(client)
    if (user) {
      if (n === 2)
        await this.sendToFriends(user.idIntra, 2)
      else if (n === 1)
        await this.sendToFriends(user.idIntra, 1)
    }
  }

        // this.server.emit('status', { idIntra: user.idIntra, status: 2 })

//prova
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @UseGuards(AtGuard)
  @SubscribeMessage('prova')
  async prova(client: Socket, message: { idChat: number, message: string }) {
    const user = await this.wsGuard(client)
    if (user && message.idChat && message.message ) {
      console.log("provaMessaggi", message)
      if (message.idChat && message.message) {
        const date = new Date()
        if (!await this.chat.isAlreadyIn(message.idChat, user.idIntra))
          throw new BadRequestException("You are not in this chat")
        else if (await this.chat.isBanned(message.idChat, user.idIntra))
        {
          console.log("banned banned banned banned")
          client.emit('provaMessaggi', {errorMessage: "You've been banned, go fuck yourself", idChat : message.idChat})
          //capire se tenere chat bannate
        }
        else if (await this.chat.isMuted(message.idChat, user.idIntra))
        {
          console.log("muted muted muted muted")
          const muted = await this.chat.getMuted({id: message.idChat}, user.idIntra)
          const now = new Date();
          const diff = muted[0].time - now.getTime();
          const minutes = Math.floor(diff / 60000);
          const messageError = "You need to shut up for " + minutes + " minutes"
          client.emit('provaMessaggi', {errorMessage: messageError, idChat : message.idChat})
          //prendere tempo di mute
        }
        else {
          if (!(message.message.length > 0 && message.message.length <= 100)) {
            client.emit('provaMessaggi', {errorMessage: "message too long (max 100 characters)", idChat : message.idChat})
          }
          else
          {
            console.log("messaggio messaggio messaggio messaggio")
            await this.saveMessage( user.idIntra, message.idChat, message.message)
            const data = {message : message.message, idIntra : user.idIntra, sendedAt : date, idChat : message.idChat, users: { userName : user.userName, img : user.img}}
            const partecipants = await this.chat.getArrayPartecipantsNotBanned(message.idChat)
            // console.log("partecipants", partecipants)
            const blockedArray = await this.userService.getAllBlockUsersFromIdIntra(user.idIntra)
            // console.log("blockedArray", blockedArray)

            // if (blockedArray.length > 0)
            //   await this.emitToUsersArray(partecipants, blockedArray, "provaMessaggi", data);//testare bloccati
            // else
            //   this.server.to(message.idChat.toString()).emit('provaMessaggi', data)
            await this.emitToUsersArray(partecipants, blockedArray, "provaMessaggi", data);//testare bloccati
          }
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
    if (user2 && users.has(message.idIntra)) {
      console.log("notification", message)
      if (message.type == 1) {
        //friend request
        this.server.to(users.get(message.idIntra).id).emit('notify', { type: 1, idIntra: user.idIntra, userName: user.userName, img: user.img })
        // client.emit("inviteFriend2", {ciao : "ciao", idIntra : user2.idIntra})
      }
      else if (message.type == 2) {
        //game invite
          this.server.to(users.get(message.idIntra).id).emit('notify', { type: 2, idIntra: user.idIntra, userName: user.userName, img: user.img })
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
        this.server.to(users.get(message.idIntra).id).emit('declineGame', { idIntra: user.idIntra })
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
@SubscribeMessage('friendHandler')
async friendHandler(client: Socket, message: { idIntra: string, type: number }) {
  console.log("friendHandler ---------------------------------------------------------------", message)
  const user = await this.wsGuard(client)
  if (user && message && message.idIntra && message.type) {
    const user2 = await this.userService.getUserByIdIntra(message.idIntra)
    if (user2 && message.type) {
        if (users.has(message.idIntra)) {
          this.server.to(users.get(message.idIntra).id).emit('friendHandler', { ciao: "ciao",idIntra: user.idIntra, type: message.type })
        }
        client.emit("friendHandler", { ciao: "ciao",idIntra: user2.idIntra, type: message.type })
    }
  }
}

@SubscribeMessage('acceptFriend')
async acceptFriend(client: Socket, message: { idIntra: string }) {
  try {
    const user = await this.wsGuard(client)
    if (user && message && message.idIntra && user.idIntra != message.idIntra) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (user2) {
        if (await this.friendSerice.acceptInvite({idIntra: message.idIntra}, user.id))
        {
          this.newDm2(client, await this.chat.newDm({idIntra : message.idIntra}, user.idIntra))
          if (users.has(message.idIntra)) {
            this.server.to(users.get(message.idIntra).id).emit('acceptFriend', { idIntra: user.idIntra, userName: user.userName, img: user.img, status: user.status })
          }
          client.emit('acceptFriend', { idIntra: user2.idIntra, userName: user2.userName, img: user2.img, status: user2.status })
        }
      }
    }
  }
  catch (e) {
    console.log(e)
    throw new WsException(e)
  }
}

@SubscribeMessage('declineFriend')
async declineFriend(client: Socket, message: { idIntra: string }) {
  const user = await this.wsGuard(client)
  if (user && message && message.idIntra && user.idIntra != message.idIntra) {
    const user2 = await this.userService.getUserByIdIntra(message.idIntra)
    if (user2) {
      await this.friendSerice.declineInvite({idIntra: message.idIntra}, user.id)
      if (users.has(message.idIntra)) {
        // this.server.to(users.get(message.idIntra).id).emit('declineFriend', { idIntra: user.idIntra })
        // client.emit('declineFriend', { idIntra: user2.idIntra })
      }
    }
  }
}


@SubscribeMessage('removeFriend')
async removeFriend(client: Socket, message: { idIntra: string }) {
  const user = await this.wsGuard(client)
  if (user && message && message.idIntra && user.idIntra != message.idIntra) {
    const user2 = await this.userService.getUserByIdIntra(message.idIntra)
    if (user2) {
      if (users.has(message.idIntra)) {
        this.server.to(users.get(message.idIntra).id).emit('removeFriend', { idIntra: user.idIntra })
      }
      client.emit('removeFriend', { idIntra: user2.idIntra })
    }
  }
}

@SubscribeMessage('newChannel')
async newChannel(client: Socket, data: any) {
  const user = await this.wsGuard(client)
  if (user) {
    if (data && data.id && data.partecipant && data.partecipant.length > 0)
    {
      this.server.emit('newJoin', data)
      for( let i = 0; i < data.partecipant.length; i++)
      {
        if (users.has(data.partecipant[i].idIntra))
        {
          this.server.to(users.get(data.partecipant[i].idIntra).id).emit('newChannel', data)
        }
      }
    }
  }
}


@SubscribeMessage('addUser')
async addUsers(client: Socket, data: any) {
  const user = await this.wsGuard(client)
  if (user) {
    if (data && data.idChat && data.idIntra)
    {
      const chat = await this.chat.getChanInfo({id: data.idChat}, user.id)
      for (let i = 0; i < data.idIntra.length; i++)
      {
        console.log("addUser", data.idIntra[i])
        const user2 = await this.userService.getUserByIdIntra(data.idIntra[i].toString())
        if (chat)
        {
          if (user2 && users.get(data.idIntra[i]))
          {
            this.server.to(users.get(user2.idIntra).id).emit('addUser', chat)
          }
          await this.refreshPartecipants(client, {idChat : data.idChat, idUser: user.id})
        }
      }
    }
  }
}

@SubscribeMessage('removeUser')
async removeUsers(client: Socket, data: any) {
  const user = await this.wsGuard(client)
  if (user) {
    if (data && data.idChat && data.idIntra)
    {
      const user2 = await this.userService.getUserByIdIntra(data.idIntra.toString())
      const chat = await this.chat.getChanInfo({id: data.idChat}, user.id)
      if (chat)
      {
        if (user2 && users.get(user2.idIntra))
        {
          this.server.to(users.get(user2.idIntra).id).emit('removeUser', {id: chat.id, idIntra : user2.idIntra})
        }
        // if (data.idIntra !== user.idIntra)
        // {
          await this.refreshPartecipants(client, {idChat : data.idChat, idUser: user.id})
        // }
      }
    }
  }
}

async refreshPartecipants(client: Socket, data:{idChat: any, idUser: any}) {
  // console.log("removeUser", data)
  const chat = await this.chat.getChanUsers({id: data.idChat, notFound: true}, data.idUser)
  // console.log("chat", chat)
  if (chat && chat.partecipants && chat.partecipants.length > 0)
  {
    for (let i = 0; i < chat.partecipants.length; i++)
    {
      if (users.has(chat.partecipants[i].idIntra))
      {
        this.server.to(users.get(chat.partecipants[i].idIntra).id).emit('refreshPartecipants', {id: data.idChat, partecipants: chat.partecipants})
      }
    }
  }
}


@SubscribeMessage('newDm')
async newDm(client: Socket, data: any) {
  await this.newDm2(client, data)
}

async newDm2(client: Socket, data: any) {
  const user = await this.wsGuard(client)
  if (user) {
    if (data && data.id)
    {
      console.log(data.partecipant)
      if (data.partecipant && data.partecipant.length > 0)
      {
        for( let i = 0; i < data.partecipant.length; i++)
        {
          console.log("user ", data.partecipant[i].user.idIntra)
          if (users.has(data.partecipant[i].user.idIntra))
          {
            console.log("newDm", data.partecipant[i].user.idIntra)
            this.server.to(users.get(data.partecipant[i].user.idIntra).id).emit('newDm', data)
          }
        }
      }
    }
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
        await this.sendToFriends(user.idIntra, 0)
      }
    }
    // this.sessionService.saveSession((client as any).idIntra, {
    //       status: "offline",
    //       socketId: client.id
    //   });
    //   this.server.sockets.emit("offline", client.handshake.query.auth)
  }

  async getMapOnlineFromIdIntraArray(idIntra: string[]) {
    var map = new Map<string, any>()
    for (let i = 0; i < idIntra.length; i++) {
      if (users.has(idIntra[i])) {
        map.set(idIntra[i], users.get(idIntra[i]))
      }
    }
    return map
  }

  async getMapNotBlockedIdIntraFromIdIntraMap(idIntra: string[], map: Map<string, any>) {
    for (let i = 0; i < idIntra.length; i++) {
      if (map.has(idIntra[i])) {
        map.delete(idIntra[i])
      }
    }
    return map
  }


  async emitToUsersArray(idIntra: string[], idIntraBanned: string[], event: string, data: any) {
    var map = await this.getMapOnlineFromIdIntraArray(idIntra)
    // console.log("emitToUsersArray", map)
    var map2 = await this.getMapNotBlockedIdIntraFromIdIntraMap(idIntraBanned, map)
    // console.log("emitToUsersArray", map2)
    map2.forEach((value, key) => {
      this.server.to(value.id).emit(event, data)
    }
    )
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

  @SubscribeMessage('blockUser')
  async blockUser(client: Socket, message: { idIntra: string }) {
    const user = await this.wsGuard(client)
    
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
        if (users.has(message.idIntra)) {
          this.server.to(users.get(message.idIntra).id).emit('blockUser', { ciao : "ciao" , idIntra: user.idIntra })
        }
        client.emit('blockUser', { ciao : "ciao" , idIntra: user2.idIntra})
        client.emit('blockUser2', { ciao : "ciao" , idIntra: user2.idIntra})
    }
  }

  @SubscribeMessage('unBlockUser')
  async unBlockUser(client: Socket, message: { idIntra: string }) {
    const user = await this.wsGuard(client)
    
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
        if (users.has(message.idIntra)) {
          this.server.to(users.get(message.idIntra).id).emit('unBlockUser', { ciao : "ciao" , idIntra: user.idIntra })
        }
        client.emit('unBlockUser', { ciao : "ciao" , idIntra: user2.idIntra})
        client.emit('unBlockUser2', { ciao : "ciao" , idIntra: user2.idIntra})

    }
  }

  @SubscribeMessage('ban')
  async ban(client: Socket, message: { idIntra: string, idChat: number }) {
    const user = await this.wsGuard(client)
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (await this.chat.isBanned(message.idChat, user2.idIntra))
      {

        if (users.has(message.idIntra)) {
          users.get(message.idIntra).leave(message.idChat.toString())
          this.server.to(users.get(message.idIntra).id).emit('banUser', { id: message.idChat })
        }
        await this.refreshPartecipants(client, {idChat : message.idChat, idUser: user.id})
      }
    }
  }

  @SubscribeMessage('unBan')
  async unBan(client: Socket, message: { idIntra: string, idChat: number }) {
    const user = await this.wsGuard(client)
    console.log("unBan", message)
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (!await this.chat.isBanned(message.idChat, user2.idIntra))
      {
        if (users.has(message.idIntra)) {
          users.get(message.idIntra).join(message.idChat.toString())
          this.server.to(users.get(message.idIntra).id).emit('unBanUser', { id: message.idChat })
        }
        await this.refreshPartecipants(client, {idChat : message.idChat, idUser: user.id})
      }
    }
  }

  @SubscribeMessage('muteUser')
  async muteUser(client: Socket, message: { idIntra: string, idChat: number }) {
    const user = await this.wsGuard(client)
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (await this.chat.isMuted(message.idChat, user2.idIntra))
      {
        // if (users.has(message.idIntra)) {
        //   this.server.to(users.get(message.idIntra).id).emit('muteUser', { id: message.idChat })
        // }
        await this.refreshPartecipants(client, {idChat : message.idChat, idUser: user.id})
      }
    }
  }

  @SubscribeMessage('unMuteUser')
  async unUser(client: Socket, message: { idIntra: string, idChat: number }) {
    const user = await this.wsGuard(client)
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (!await this.chat.isMuted(message.idChat, user2.idIntra))
      {
        // if (users.has(message.idIntra)) {
        //   this.server.to(users.get(message.idIntra).id).emit('unUser', { id: message.idChat })
        // }
        await this.refreshPartecipants(client, {idChat : message.idChat, idUser: user.id})
      }
    }
  }

  @SubscribeMessage('promoteUser')
  async promoteUser(client: Socket, message: { idIntra: string, idChat: number }) {
    const user = await this.wsGuard(client)
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (await this.chat.isAdmin(message.idChat, user2.id))
      {
        if (users.has(message.idIntra)) {
          this.server.to(users.get(message.idIntra).id).emit('promoteUser', { id: message.idChat })
        }
        await this.refreshPartecipants(client, {idChat : message.idChat, idUser: user.id})
      }
    }
  }

  @SubscribeMessage('demoteUser')
  async demoteUser(client: Socket, message: { idIntra: string, idChat: number }) {
    const user = await this.wsGuard(client)
    if (user) {
      const user2 = await this.userService.getUserByIdIntra(message.idIntra)
      if (!await this.chat.isAdmin(message.idChat, user2.id))
      {
        if (users.has(message.idIntra)) {
          this.server.to(users.get(message.idIntra).id).emit('demoteUser', { id: message.idChat })
        }
        await this.refreshPartecipants(client, {idChat : message.idChat, idUser: user.id})
      }
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
