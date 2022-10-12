import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";

@Module({
	imports: [UserModule],
	controllers: [FriendController],
	providers: [PrismaService, FriendService]
})

export class FriendModule {}