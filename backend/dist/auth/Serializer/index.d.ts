import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { AuthenticationProvider } from "../auth";
export declare class SessionSerializer extends PassportSerializer {
    private readonly authService;
    constructor(authService: AuthenticationProvider);
    serializeUser(user: User, done: (err: Error, user: User) => void): void;
    deserializeUser(user: User, done: (err: Error, user: User) => void): Promise<void>;
}
