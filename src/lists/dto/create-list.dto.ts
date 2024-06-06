import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    @IsNotEmpty()
    name: string; // Name of the board
    
    description: string; // Description of the board
    
    @IsString()
    @IsNotEmpty()
    username: string; // The username of the user who created the list
}
