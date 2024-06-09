import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNumber()
    listId: number;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    description: string;
}
