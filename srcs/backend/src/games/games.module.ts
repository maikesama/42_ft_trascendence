import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { GamesGateway } from "./games.gateway";

@Module({
	imports: [UserModule],
	controllers: [GamesController],
	providers: [PrismaService, GamesService, GamesGateway],
})

export class GamesModule {}
