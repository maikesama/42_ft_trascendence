import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { FTStrategy } from "./42strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { SessionSerializer } from "./Serializer";

@Module({
	controllers: [AuthController],
	providers: [
		// SessionSerializer,
		{
		provide: 'AUTH_SERVICE',
		useClass: AuthService,
	}, AuthService, PrismaService]
})
export class AuthModule {}