// import { Inject, Injectable } from "@nestjs/common"
// import { PassportSerializer } from "@nestjs/passport"
// import { User } from "@prisma/client"
// import { AuthenticationProvider } from "../auth";
// import { AuthService } from "../auth.service";


// @Injectable()
// export class SessionSerializer extends PassportSerializer {
// 	constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) { super();}

// 	serializeUser(user: User, done: (err: Error, user: User) => void) {
// 		done(null, user);
// 	}

// 	async deserializeUser(user: User, done: (err: Error, user: User) => void) {
// 		const userDB = await this.authService.findUser(user.id);
// 		return userDB ? done(null, userDB) : done(null, null);
// 	}
// }