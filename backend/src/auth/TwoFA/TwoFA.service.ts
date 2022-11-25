import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { Response} from 'express';
import {PrismaService} from "../../prisma/prisma.service"
import {GeneratedSecret} from 'speakeasy'
import * as speakeasy from 'speakeasy'
import * as qrcode from 'qrcode'
import { AuthService } from "../auth.service";

@Injectable()
export class TwoFactorAuthenticationService {
	constructor(private prisma: PrismaService, private authservice: AuthService) {}

	async turnOnTwoFa(id: number) {
		let otp = await this.prisma.user.findUnique({
			where:{
				id: id
			},
			select: {
				otpSecret: true
			}
		})
		if (otp.otpSecret === "") {
			let secret : GeneratedSecret = speakeasy.generateSecret({
				name: "42Pong"
			});
			await this.prisma.user.update({
				where: {
					id: id,
				},
				data: {
					otpSecret: secret.base32,
					otpUrl : secret.otpauth_url,
				}
			})	
		}	
	}

	async complete2fa(body: any) : Promise<string>{
		var Id: number = +body
		console.log(Id)
		await this.turnOnTwoFa(Id)
		let secret : {otpUrl: string, twoFa: Boolean} = await this.prisma.user.findUniqueOrThrow({
			where:{
				id : Id
			},
			select:{
				twoFa: true,
				otpUrl: true,
			}
		});

		// if (!secret.twoFa)
		// 	return
		if (secret.otpUrl)
		{
			return(await qrcode.toDataURL(secret.otpUrl));

		}
		else
			return "non ce niente"
	}

	async verify2fa(body: any, res: any, id : number) {

		try {
			if (id === undefined || body.totp === undefined)
				throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
			const idNumber: number = +id;
			console.log(idNumber)
			let user = await this.prisma.user.findUniqueOrThrow({
				where:{
					id : idNumber
				},
			});
			if (user.twoFa === false)
				throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
			let verified = speakeasy.totp.verify({
				secret: user.otpSecret,
				encoding: 'base32',
				token: body.totp });
			
			if (verified)
			{
				const tokens = await this.authservice.generateJwtTokens(user);
				res.clearCookie('id');
				res.cookie('at', tokens.access_token, { httpOnly: true })
				return res.redirect('/')
			}
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

		}
		catch (e) {
			console.log(e)
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
	}

	async verify2fa2(body: any, userId: number) {
		try {

			let user = await this.prisma.user.findUniqueOrThrow({
				where:{
					id : userId
				}
			});
	
			let verified = speakeasy.totp.verify({
				secret: user.otpSecret,
				encoding: 'base32',
				token: body.totp });
	
			if (verified)
			{
				await this.prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						twoFa: true,
					}
				})
				
				return {message: "ok", status: 200};
			}
			return {message: "Invalid token", status: 401};
		}
		catch (e) {
			return {message: "Invalid token", status: 401};
		}
	}
}