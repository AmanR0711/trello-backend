import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { TrelloUser } from "src/users/entities/user.entity";
import { TrelloBoard } from "./board.entity";

// This entity is used to define the scopes of the Trello board
// The scopes are the different levels of access that a user can have on a board
// Any user can have one of the following scopes:
// 1. No access
// 2. Read-only access
// 3. Read-write access
export enum TrelloBoardScope {
    noaccess = 'No-access',
    readOnly = 'Read-only',
    readWrite = 'Read-write',
}; 

@Entity()
export class TrelloBoardScopes {
    @Column({ primary: true, unique: true })
    @OneToOne(() => TrelloBoard, board => board.id)
    boardId: string;

    @Column()
    scope: TrelloBoardScope;

    // Which user this scope belongs to
    @OneToOne(() => TrelloUser, user => user.username)
    username: string;
}