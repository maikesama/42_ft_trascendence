import { Module } from '@nestjs/common';
import { AtStrategy } from 'src/auth/strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [UserController],
	providers: [UserService, AtStrategy, JwtService]
})
export class UserModule {}
