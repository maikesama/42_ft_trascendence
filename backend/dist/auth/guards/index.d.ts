import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const FortyTwoAuthGuards_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FortyTwoAuthGuards extends FortyTwoAuthGuards_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AuthenticateGuards implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
