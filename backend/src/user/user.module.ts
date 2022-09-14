import { Module } from '@nestjs/common';
import { AtStrategy } from 'src/auth/strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
	providers: [UserService, AtStrategy]
})
export class UserModule {}
