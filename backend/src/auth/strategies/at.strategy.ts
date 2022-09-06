import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

var cookieExtractor = function(req) {

	var token = null;
	if (req && req.cookies) {
		console.log(req.cookies)
		token = req.cookies['at'];
		// if(!token) Will do it when we got 2fa
		// 	token = req.cookies['2fa-at']
	}
	return token;
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt')
{
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
			secretOrKey: process.env.AtSecret
		});
	}

	validate(payload: any) {
		return payload;
	}
}