import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { TrelloUser } from "src/users/entities/user.entity";
import { TrelloBoardScopes } from "./scopes.entity";

@Entity()
export class TrelloBoard {
    // Unique identifier for the board
    @PrimaryColumn({ generated: 'uuid' })
    id: string;

    // Name of the board
    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;
    
    // Creator of the board
    // One user can create multiple boards
    @ManyToOne(() => TrelloUser, user => user.boards, { eager: true })
    creator: TrelloUser;

    @OneToMany(type => TrelloBoardScopes, scope => scope.board)
    scopes: TrelloBoardScopes[]
}
