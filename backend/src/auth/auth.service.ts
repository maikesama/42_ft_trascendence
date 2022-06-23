import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticationProvider } from "./auth";

@Injectable()
export class AuthService implements AuthenticationProvider{
	constructor(private prisma: PrismaService) {}

	async validateUser(details: User) {

		const { id } = details;
			const user = await this.prisma.user.findUnique({
				where: {
					id
				}
		})
		if (user) return user;
		return this.createUser(details);

	}
	createUser(details: User) {
		console.log('Creating user');
		const user = this.prisma.user.create({ data: details });
		return this.prisma.user;
	}
	findUser(Id: number) : Promise<User | undefined> {
		return this.prisma.user.findUnique({
			where: {
				id: Id
			}
		})
	}
}