import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";

@Module({
	imports: [UserModule],
	controllers: [GamesController],
	providers: [PrismaService, GamesService]
})

export class GamesModule {}