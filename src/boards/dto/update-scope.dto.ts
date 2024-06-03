import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TrelloBoardScope } from "../entities/scopes.entity";

export class UpdateScopeDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEnum(TrelloBoardScope)
    scope: TrelloBoardScope;
}