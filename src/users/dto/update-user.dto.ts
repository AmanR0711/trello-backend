// Represents any of the fields a TrelloUser may update

import { TrelloTheme } from "../entities/user.entity";

// No email field, as it is not updatable (Google OAuth)
export class UpdateUserDto {
    username?: string;
    avatarUrl?: string;
    theme?: TrelloTheme;
}
