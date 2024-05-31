
import { TrelloTheme } from "../entities/user.entity";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

// Represents a new TrelloUser
// Requires a username, an email
// an optional avatarUrl
// theme is by default Light

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    avatarUrl?: string;

    @IsEnum(TrelloTheme)
    theme?: TrelloTheme;
}
