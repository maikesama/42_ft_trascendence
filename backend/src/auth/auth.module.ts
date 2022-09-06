import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
// import { FTStrategy } from "./42strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AtStrategy, RtStrategy } from "./strategies";
// import { SessionSerializer } from "./Serializer";

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [ AuthService, AtStrategy, RtStrategy ]
})
export class AuthModule {}