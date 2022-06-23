import { Module } from "@nestjs/common";
import { FTStrategy } from "./42strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SessionSerializer } from "./Serializer";

@Module({
	controllers: [AuthController],
	providers: [FTStrategy,
		SessionSerializer,
		{
		provide: 'AUTH_SERVICE',
		useClass: AuthService,
	}]
})
export class AuthModule {}