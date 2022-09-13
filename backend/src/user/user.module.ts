import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
	providers: []
})
export class UserModule {}
