import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { TrelloBoardBackgroundColor } from "../entities/board.entity";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    name: string; // Name of the board
    
    @IsString()
    @IsNotEmpty()
    username: string; // The username of the user who created the board

    description: string; // Description of the board

    @IsEnum(TrelloBoardBackgroundColor)
    bgColor: TrelloBoardBackgroundColor; // Board background color
}
