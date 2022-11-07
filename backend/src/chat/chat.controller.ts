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
    @Post('getChanInfo')
    async getChanInfo(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getChanInfo(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getUserPrivilegeInfo')
    async getUserPrivilegeInfo(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getUserPrivilegeInfo(body, user['sub'])
    }
    //non esiste ancore=allora non so come testarlo

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('searchUserToAdd')
    async searchUserToAdd(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.searchUserToAdd(body, user['sub'])
    }



    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('newDm')
    async newDm(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.newDm(body, user['sub'])
    }
    //non esiste ancore=allora non so come testarlo

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
    @Post('searchGeneral')
    async searchGeneral(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.searchGeneral(body, user['sub'])
    }
      //non esiste ancore=allora non so come testarlo

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('muteUser')
    async muteUser(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.muteUser(body, user['sub'])
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
    @Post('getBanned')
    async getBanned(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getBanned(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getMuted')
    async getMuted(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getMuted(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getAdmin')
    async getAdmin(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getAdmin(body, user['sub'])
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

    //non esiste ancore=allora non so come testarlo

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('changeVisibility')
    async changeVisibility(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.changeVisibility(body, user['sub'])
    }
    //non esiste ancore=allora non so come testarlo

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

    //get all partecipants in channel 
    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getChanUsers')
    async getChanUsers(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getChanUsers(body, user['sub'])
    }


    // get my chats
    @UseGuards(AtGuard)
    @HttpCode(200)
    @Get('getChatUsers')
    async getChatUsers(@Body() body, @Req() req){
        const user = req.user
        return await this.chatService.getChatUsers(body, user['sub'])
    }
}