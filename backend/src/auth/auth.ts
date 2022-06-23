import { User } from "@prisma/client";

export interface AuthenticationProvider {

	createUser(details: User);
	validateUser(details: User);
	findUser(id: number): Promise<User | undefined> ;
}