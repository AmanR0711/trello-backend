import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TrelloListScope } from "../entities/scopes.entity";

export class UpdateScopeDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEnum(TrelloListScope)
    scope: TrelloListScope;
}