import { TrelloBoard } from "src/boards/entities/board.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrelloListScopes } from "./scopes.entity";

// A List of Tasks in a Trello Board
@Entity()
export class TrelloList {
    // Unique Identifier
    @PrimaryGeneratedColumn('increment')
    id: number;

    // Name of the List
    @Column()
    name: string;

    // Description of the List
    @Column({ nullable: true })
    description: string;

    // Board ID to which the List belongs
    // One board can have many lists
    @ManyToOne(() => TrelloBoard, board => board.lists)
    board: TrelloBoard;

    // List-wise read/write scope
    // One list can have many users' scopes
    @OneToMany(() => TrelloListScopes, scope => scope.list)
    scopes: TrelloListScopes[];

    // Created At
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;
}
