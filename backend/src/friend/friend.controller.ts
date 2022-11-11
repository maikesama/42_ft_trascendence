import { Controller, Post, Body, Req, UseGuards, HttpCode, Get, Res } from '@nestjs/common'
import { AtGuard } from 'src/auth/guards';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController{
    constructor(private friendService: FriendService){}

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('inviteFriend')
    async inviteFriend(@Body() body, @Req() req){
        const user = req.user
        return await this.friendService.inviteFriend(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('acceptInvite')
    async acceptInvite(@Body() body, @Req() req){
        const user = req.user
        return await this.friendService.acceptInvite(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('declineInvite')
    async declineInvite(@Body() body, @Req() req){
        const user = req.user
        return await this.friendService.declineInvite(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('removeInvite')
    async removeInvite(@Body() body, @Req() req){
        const user = req.user
        return await this.friendService.removeInvite(body, user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('getFriends')
    async getFriends(@Body() body, @Req() req){
        const user = req.user
        if (body['idIntra'] !== undefined)
            user['idIntra'] = body['idIntra'];
        return await this.friendService.getFriends(body, user['idIntra'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('isFriend')
    async isFriend(@Body() body, @Req() req){
        const user = req.user
        if (body['idIntra'] !== undefined)
            return await this.friendService.isFriend(user['idIntra'], body.idIntra)
            
    }


    @UseGuards(AtGuard)
    @HttpCode(200)
    @Get('getInvite')
    async getInvite(@Req() req){
        const user = req.user
        return await this.friendService.getInvited(user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Get('getInvitedByMe')
    async getInvitedByMe(@Req() req){
        const user = req.user
        return await this.friendService.getInvitedByMe(user['sub'])
    }

    @UseGuards(AtGuard)
    @HttpCode(200)
    @Post('removeFriend')
    async removeFriend(@Body() body, @Req() req){
        const user = req.user
        return await this.friendService.removeFriend(body, user['sub'])
    }

    @Get('/new/all')
    async defaultFriends(@Res() res){
        await this.friendService.defaultFriends();
        return res.redirect('/profile');
    }
}
