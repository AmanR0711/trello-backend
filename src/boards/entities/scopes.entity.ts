import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => TrelloBoard, board => board.id)
    boardId: string;

    @Column()
    scope: TrelloBoardScope;

    // Which user this scope belongs to
    @Column()
    @OneToOne(() => TrelloUser, user => user.username)
    username: string;

    @ManyToOne(() => TrelloBoard, board => board.id, { onDelete: "CASCADE" })
    board: TrelloBoard;
}