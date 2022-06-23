import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticationProvider } from '../auth';
declare const FTStrategy_base: new (...args: any[]) => any;
export declare class FTStrategy extends FTStrategy_base {
    private readonly authService;
    private prisma;
    constructor(authService: AuthenticationProvider, prisma: PrismaService);
    validate(accesToken: string, refreshToken: string, profileFields: any): Promise<any>;
}
export {};
