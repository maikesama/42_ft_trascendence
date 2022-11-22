import { IsString, IsOptional, IsEmail, IsNumber, IsBoolean, MaxLength, MinLength, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class createChannelDTO {

	@IsString()
	@MinLength(0)
	@MaxLength(15)
	@IsNotEmpty()
  	@IsAlphanumeric()
	name: string;

	@IsString()
	@IsNotEmpty()
	@IsAlphanumeric()
	@MinLength(0)
	@MaxLength(9)
	type: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(0)
	@MaxLength(30)
	@IsOptional()
	password: string;


	@IsOptional()
	partecipants: string[];

}
