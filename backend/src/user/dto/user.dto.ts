import { IsString, IsOptional, IsEmail, IsNumber, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class setUsernameDTO {

	@IsString()
	@MinLength(4)
	@MaxLength(9)
	userName: string;

}
