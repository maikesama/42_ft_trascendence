import { Injectable, HttpStatus, HttpException, Res} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from "../../user/user.service";
import { Response } from 'express'

var cookieExtractor = function(req) {

	var token = null;
	if (req)
	{
	//   console.log(req);
	  if (req.cookies && req.cookies['at'])
	  {
		token = req.cookies['at'];
	  }
	  else if (req.handshake && req.handshake.headers && req.handshake.headers.cookie ||
		req.headers && req.headers.cookie)
	  {
		var cookies = (req.handshake) ? req.handshake.headers.cookie :req.headers.cookie;
		cookies = cookies.split(';');
		cookies.forEach(function (cookie) {
		  var parts = cookie.split('=');
		  if (parts[0].trim() === 'at')
			token = parts[1].trim();
		});
	  }
	}
	return token;
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt')
{
	constructor( private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
			ignoreExpiration: false,
			secretOrKey: process.env.AtSecret

		});
	}

	async validate(payload: any, @Res() res) {
		// console.log(JSON.stringify(payload))
		const user = await this.userService.getUserById(payload.sub);
		if (!user || user === undefined|| user === null || !payload || !payload.idIntra || !payload.sub || user.idIntra !== payload.idIntra)
		{
			console.log("no payload")
			res.redirect('/');
			// throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
		}
		return payload;
	}
}
