import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { GamesGateway } from "./games.gateway";
import { AppGateway } from "src/app.gateway";
import { ChatService } from "src/chat/chat.service";

@Module({
	imports: [UserModule],
	controllers: [GamesController],
	providers: [PrismaService, GamesService, GamesGateway, AppGateway, ChatService],
	//exports: [GamesGateway]
})

export class GamesModule {}
