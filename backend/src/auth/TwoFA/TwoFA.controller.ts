import {
	ClassSerializerInterceptor,
	Controller,
	Header,
	Post,
	UseInterceptors,
	Res,
	UseGuards,
	Req,
  } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './TwoFA.service';
import { Response } from 'express';
import { User } from "@prisma/client"
import RequestWithUser from '../requestWithUser.interface';

  @Controller('2fa')
  @UseInterceptors(ClassSerializerInterceptor)
  export class TwoFactorAuthenticationController{
	constructor( private readonly twofaservice: TwoFactorAuthenticationService) {}

	@Post('generate')
	async register(@Res() response: Response,  @Req() request: RequestWithUser){
		const {otpAuthURL} = await this.twofaservice.generateTwoFactorAuthenticationSecret(request.user);

		return this.twofaservice.pipeQrCodeStream(response, otpAuthURL);

	}
  }