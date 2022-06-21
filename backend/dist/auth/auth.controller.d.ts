import { AuthService } from "./auth.service";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(): string;
}
