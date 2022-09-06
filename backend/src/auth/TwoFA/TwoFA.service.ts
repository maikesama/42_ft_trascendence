import { Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import { toFileStream } from 'qrcode';
import { Response} from 'express';
import { User } from "@prisma/client"
import {PrismaService} from "../../prisma/prisma.service"

@Injectable()
export class TwoFactorAuthenticationService {
	constructor(private readonly prisma: PrismaService) {}

	public async generateTwoFactorAuthenticationSecret(user: User) {

			const secret = authenticator.generateSecret();

			const otpAuthURL = authenticator.keyuri(user.email, process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, secret);

			await this.prisma.user.update({
				where:{ id: user.id },
				data: { secret: secret }
			})

			return {
				secret,
				otpAuthURL
			}
	}

	public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
		return toFileStream(stream, otpauthUrl);
	}

	public isTwoFaCodeValid(twofaCode: string, user: User)
	{
		return authenticator.verify({
			token: twofaCode,
			secret: user.secret,
		})
	}
}