import { IsString, IsOptional, IsEmail, IsNumber, IsBoolean, MaxLength, MinLength, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class setUsernameDTO {

	@IsString()
	@MinLength(4)
	@MaxLength(9)
	@IsNotEmpty()
  	@IsAlphanumeric()
	userName: string;

}
