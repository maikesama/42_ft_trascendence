import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common'
import { AtGuard } from 'src/auth/guards';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController{
    constructor(private chatService: ChatService){}
	

    @UseGuards(AtGuard)
    @Post('newChannel')
    newChannel(@Body() body, @Req() req){
        const user = req.user
        this.chatService.newChannel(body, user['sub'])
    }
}