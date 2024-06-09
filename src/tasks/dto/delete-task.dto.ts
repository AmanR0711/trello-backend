import { IsNumber } from "class-validator";

export class DeleteTaskDto {
    @IsNumber()
    listId: number;
    @IsNumber()
    taskId: number;
}