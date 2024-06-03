import { IsNotEmpty, IsString } from "class-validator";

export class RetrieveAllBoardsDto {
    @IsString()
    @IsNotEmpty()
    username: string;
}