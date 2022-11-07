import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";

@Module({
	imports: [UserModule],
	controllers: [ChatController],
	providers: [PrismaService, ChatService],
	exports: [ChatService]
})

export class ChatModule {}