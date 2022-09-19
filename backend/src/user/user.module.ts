import { Module } from '@nestjs/common';
import { AtStrategy } from 'src/auth/strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from "@nestjs/jwt";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwoFactorAuthenticationService} from './../auth/TwoFA/TwoFA.service'
import { AuthService} from './../auth/auth.service'

@Module({
	imports:[
	// 	ClientsModule.register([
	// 		{
	// 		  name:"NOTIFICATION_SERVICE",
	// 		  transport: Transport.TCP
	// 		}
	// ]),
	AuthModule],
    controllers: [UserController],
	providers: [UserService, AuthService, AtStrategy, JwtService, PrismaService, TwoFactorAuthenticationService],
	exports: [UserService]
})
export class UserModule {}
