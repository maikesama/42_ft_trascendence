import { User } from "@prisma/client";
export interface AuthenticationProvider {
    createUser(details: User): any;
    validateUser(details: User): any;
    findUser(id: number): Promise<User | undefined>;
}
