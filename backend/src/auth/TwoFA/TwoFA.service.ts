import { Injectable } from "@nestjs/common";
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
		this.turnOnTwoFa(Id)
		let secret : {otpUrl: string, twoFa: Boolean} = await this.prisma.user.findUniqueOrThrow({
			where:{
				id : Id
			},
			select:{
				twoFa: true,
				otpUrl: true,
			}
		});

		if (!secret.twoFa)
			return
		console.log(secret.otpUrl)
		return(await qrcode.toDataURL(secret.otpUrl));
	}

	async verify2fa(body: any, res: Response) :Promise<Boolean> {
		let user = await this.prisma.user.findUniqueOrThrow({
			where:{
				id : body.id
			},
			select:{
				idIntra : true,
				otpSecret : true,
				id: true,
				email: true
			}
		});

		let verified = speakeasy.totp.verify({
			secret: user.otpSecret,
			encoding: 'base32',
			token: body.totp });

		if (verified)
		{
			const tokens = await this.authservice.generateJwtTokens(user.id, user.email);
			res.cookie('at', tokens.access_token, { httpOnly: true })
			res.redirect('/home')
			return true;
		}
		return false;
	}
}