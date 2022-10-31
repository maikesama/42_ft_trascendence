"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("./prisma/prisma.service");
const chat_service_1 = require("./chat/chat.service");
const guards_1 = require("./auth/guards");
const session_service_1 = require("./sessionHandler/session.service");
let AppGateway = class AppGateway {
    constructor(prisma, chat, cacheManager, sessionService) {
        this.prisma = prisma;
        this.chat = chat;
        this.cacheManager = cacheManager;
        this.sessionService = sessionService;
        this.logger = new common_1.Logger('AppGateway');
        this.clientToUser = {};
        this.sessionService = new session_service_1.SessionService(this.cacheManager);
    }
    afterInit(server) {
        this.logger.log('initialized');
    }
    OnGatewayConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    OnGatewayDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    OnGatewayInit(server) {
        this.logger.log('initialized');
    }
    async handleConnection(client, req, ...args) {
        try {
            const user = req.user;
            const me = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: user['sub']
                },
            });
            let session = await this.sessionService.findSession(me.idIntra);
            if (session && session.status !== 'offline') {
                client.emit('alreadyLoggedIn', 'Already logged in');
                client.to(session.socketId).emit('alreadyLoggedIn', 'Already logged in');
                return;
            }
            else {
                await this.sessionService.saveSession(me.idIntra, {
                    status: 'online',
                    socketId: client.id,
                });
                client.idIntra = me.idIntra;
                console.log(client.idIntra);
                let chats = await this.prisma.partecipant.findMany({
                    where: {
                        idIntra: me.idIntra
                    },
                });
                await Promise.all(chats.map(async (chat) => {
                    client.join(chat.idChat.toString());
                }));
            }
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    handleDisconnect(client) {
        this.sessionService.saveSession(client.idIntra, {
            status: "offline",
            socketId: client.id
        });
        this.server.sockets.emit("offline", client.handshake.query.auth);
    }
    async verifyPartecipant(idIntra, idChat) {
        try {
            const partecipant = await this.prisma.partecipant.findUnique({
                where: {
                    idIntra_idChat: { idIntra, idChat }
                }
            });
            return partecipant;
        }
        catch (e) {
            return false;
        }
    }
    async isChatAdmin(idIntra, idChat) {
        try {
            const partecipant = await this.prisma.partecipant.findUnique({
                where: {
                    idIntra_idChat: { idIntra, idChat }
                }
            });
            return partecipant.admin;
        }
        catch (e) {
            return false;
        }
    }
    async saveMessage(message) {
        try {
            const newMessage = await this.prisma.message.create({
                data: {
                    idChat: message.idChat,
                    idIntra: message.sender,
                    message: message.text
                }
            });
            return newMessage;
        }
        catch (e) {
            return false;
        }
    }
    identify(name, clientId) {
        this.clientToUser[clientId] = name;
        return Object.values(this.clientToUser);
    }
    getClientName(clientId) {
        return this.clientToUser[clientId];
    }
    async handleMessage(client, message) {
        try {
            const chat = await this.prisma.chat.findUniqueOrThrow({
                where: {
                    id: message.idChat
                }
            });
            if (await this.chat.isMuted(chat.name, message.sender))
                throw new common_1.BadRequestException("You are muted from this chat");
            if (await this.chat.isBanned(chat.name, message.sender))
                throw new common_1.BadRequestException("You are banned from this chat");
            if (!await this.verifyPartecipant(message.sender, message.idChat))
                throw new common_1.BadRequestException("You are not partecipant of this chat");
            await this.saveMessage(message);
            this.server.to(message.idChat.toString()).emit('msgToClient', message);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async findAllMessages(client, idChat) {
        try {
            const messages = await this.prisma.message.findMany({
                where: {
                    idChat: idChat
                }
            });
            return messages;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async handleJoin(client, message) {
        return this.identify(message.sender, client.id);
    }
    async handleTyping(isTyping, client, idChat) {
        const name = await this.getClientName(client.id);
        client.broadcast.emit('typing', { isTyping, name });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllMessages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "findAllMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChat'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)('isTyping')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleTyping", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ transports: ['websocket'], cors: true }),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, chat_service_1.ChatService, Object, session_service_1.SessionService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map