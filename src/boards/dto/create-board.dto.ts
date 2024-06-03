import { IsNotEmpty, IsString } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    name: string; // Name of the board
    
    @IsString()
    @IsNotEmpty()
    username: string; // The username of the user who created the board
}
