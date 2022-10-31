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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
let SessionService = class SessionService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.sessions = new Map();
    }
    async saveSession(id, session) {
        try {
            await this.cacheManager.set(id, session, 0);
        }
        catch (e) {
            throw new common_1.BadGatewayException(e);
        }
    }
    async findSession(userId) {
        try {
            let session = await this.cacheManager.get(userId);
            return session;
        }
        catch (e) {
            throw new common_1.BadGatewayException(e);
        }
    }
    async findAllSessions() {
        try {
            return await this.sessions;
        }
        catch (e) {
            throw new common_1.BadGatewayException(e);
        }
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map