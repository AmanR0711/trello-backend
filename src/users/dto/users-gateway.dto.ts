import { IsNotEmpty, IsString } from "class-validator";

export class UsersGatewayDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}