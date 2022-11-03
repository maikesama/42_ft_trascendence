import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
// import { FTStrategy } from "./42strategy";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AtStrategy } from "./strategies";
import { TwoFactorAuthenticationService } from "./TwoFA/TwoFA.service";
// import { SessionSerializer } from "./Serializer";

@Module({
	// imports: [JwtModule.register({})],
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.AtSecret,
			signOptions: { expiresIn: '1d' },
		})
	],
	controllers: [AuthController],
	providers: [ AuthService, AtStrategy, TwoFactorAuthenticationService ]
})
export class AuthModule {}