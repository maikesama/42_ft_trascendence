import { Controller, Post, Body, Req, UseGuards, HttpCode, Get } from '@nestjs/common'
import { AtGuard } from 'src/auth/guards';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController{
    constructor(private chatService: ChatService){}
	
    
    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('newChannel')
    async newChannel(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.newChannel(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('newDm')
    async newDm(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.newDm(body, user['sub'])
    }

    // search user by initials letters - see jquery ajax frontend
    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('searchUser')
    async searchUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.searchUser(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('muteUser')
    async muteUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.muteUser(body, user['sub'])
        // control if theres a time limit in body
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('unmuteUser')
    async unmuteUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.unMuteUser(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('banUser')
    async banUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.banUser(body, user['sub'])
        // control if theres a time limit in body
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('unbanUser')
    async unbanUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.unBanUser(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('joinChannel')
    async joinChannel(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.joinChannel(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('leaveChannel')
    async leaveChannel(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.leaveChannel(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('changePassword')
    async changePassword(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.changePassword(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('changeVisibility')
    async changeVisibility(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.changeVisibility(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('addUser')
    async addUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.addUser(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('removeUser')
    async removeUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.removeUser(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('addAdmin')
    async addAdmin(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.addAdmin(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('removeAdmin')
    async removeAdmin(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.removeAdmin(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Get('getChannels')
    async getChannels(@Req() req){
        const user = req.user
        return await this.chatService.getChannels(user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Get('getChatUsers')
    async getChatUsers(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getChatUsers(body, user['sub'])
    }
}