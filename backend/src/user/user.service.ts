import { ForbiddenException, Injectable } from "@nestjs/common";
import { Res, Query, HttpException, HttpStatus} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service"
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async getProfile(query: string)
	{
		
	}
}