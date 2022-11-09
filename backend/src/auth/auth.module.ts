import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
// import { FTStrategy } from "./42strategy";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AtStrategy } from "./strategies";
import { TwoFactorAuthenticationService } from "./TwoFA/TwoFA.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
// import { SessionSerializer } from "./Serializer";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.AtSecret,
			signOptions: { expiresIn: '1h' },
		}),
		// UserModule, 
	],
	controllers: [AuthController],
	providers: [ AuthService, AtStrategy, TwoFactorAuthenticationService, UserService ]
})
export class AuthModule {}