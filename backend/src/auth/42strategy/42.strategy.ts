import { Get, Inject, Injectable, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy, userAgent } from 'passport-42';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticationProvider } from '../auth';



@Injectable()
export class FTStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider,
		private prisma: PrismaService,
	  ){
		super({
			clientID: process.env.UID,
			clientSecret: process.env.SECRET,
			callbackURL: "http://localhost:3000/auth/42/callback",
			scope: ['id'],
			profileFields: {
				'id': function (obj) { return String(obj.id); },
				'username': 'login',
				'displayName': 'displayname',
				'name.familyName': 'last_name',
				'name.givenName': 'first_name',
				'profileUrl': 'url',
				'emails.0.value': 'email',
				'phoneNumbers.0.value': 'phone',
				'photos.0.value': 'image_url'
			  }

		});
	}

// init() {
// 	const FortyTwoStrategy = require('passport-42').Strategy;
// 	const passport = require('passport');
// 	const app = require('express');
	
// 	passport.use(new FortyTwoStrategy({
// 		clientID: this.config.get('UID'),
// 		clientSecret: this.config.get('SECRET'),
// 		callbackURL: "http://localhost:3000/auth/42/callback" //goin to change it when we got homepage

// 	},
// 	function(accesToken, refreshToken, profile, cb) {
// 		this.prisma.User.findOrCreate({ id: profile.id }, function(err, user) {
// 			return cb(err, user);
// 		});
// 	}))

// 	app.get('/auth/42',
// 	passport.authenticate('42'));

// 	app.get('/auth/42/callback', 
// 	passport.authenticate('42', { failureRedirect: '/login' }),
// 	function(req, res) {
// 		// Successful authentication, redirect home.
// 		res.redirect('/');
// 	});

	async validate(accesToken: string, refreshToken: string, profileFields) {
		const { id, email, username } = profileFields;

		const details = { id, email, username};
		
		return this.authService.validateUser(details);
	}
};