import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticationProvider } from "./auth";
export declare class AuthService implements AuthenticationProvider {
    private prisma;
    constructor(prisma: PrismaService);
    validateUser(details: User): Promise<User | import(".prisma/client").Prisma.UserDelegate<import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation>>;
    createUser(details: User): import(".prisma/client").Prisma.UserDelegate<import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation>;
    findUser(Id: number): Promise<User | undefined>;
}
