import { Module } from '@nestjs/common';
import { AtStrategy } from 'src/auth/strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from "@nestjs/jwt";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

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
	providers: [UserService, AtStrategy, JwtService, PrismaService],
	exports: [UserService]
})
export class UserModule {}
