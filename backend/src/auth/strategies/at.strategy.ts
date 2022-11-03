import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

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
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
			ignoreExpiration: false,
			secretOrKey: process.env.AtSecret

		});
	}

	validate(payload: any) {
		console.log(JSON.stringify(payload))
		if (!payload || !payload.id)
		{
			console.log("no payload")
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
		}
		return payload;
	}
}
