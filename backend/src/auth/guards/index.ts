import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';

const passport = require('passport');



@Injectable()
export class FortyTwoAuthGuards extends AuthGuard('42') {
	
	async canActivate(context: ExecutionContext) {
		// passport.authenticate('42');
		const activate = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return activate;
	}
}

@Injectable()
export class AuthenticateGuards implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		return req.isAuthenticated();
	}
}