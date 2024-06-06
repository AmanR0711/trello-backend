import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { TrelloUser } from "src/users/entities/user.entity";
import { TrelloBoardScopes } from "./scopes.entity";

// Enum for board background color
// From MaterialColors.primaries (Flutter)
enum TrelloBoardBackgroundColor {
    PINK = 'pink',
    RED = 'red',
    RED_ACCENT = 'red-accent',
    DEEP_ORANGE = 'deep-orange',
    ORANGE = 'orange',
    AMBER = 'amber',
    YELLOW = 'yellow',
    LIME = 'lime',
    LIME_ACCENT = 'lime-accent',
    LIGHT_GREEN = 'light-green',
    GREEN = 'green',
    TEAL = 'teal',
    CYAN = 'cyan',
    LIGHT_BLUE = 'light-blue',
    BLUE = 'blue',
    INDIGO = 'indigo',
    DEEP_PURPLE = 'deep-purple',
    BLUE_GREY = 'blue-grey',
    BROWN = 'brown',
    GREY = 'grey',
    BLACK = 'black',
    WHITE = 'white'
};

@Entity()
export class TrelloBoard {
    // Unique identifier for the board
    @PrimaryColumn({ generated: 'uuid' })
    id: string;

    // Name of the board
    @Column()
    name: string;

    // Description of the board
    @Column({ nullable: true })
    description: string;

    // Board background color
    @Column()
    bgColor: TrelloBoardBackgroundColor;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;
    
    // Creator of the board
    // One user can create multiple boards
    @ManyToOne(() => TrelloUser, user => user.boards, { eager: true })
    creator: TrelloUser;

    @OneToMany(type => TrelloBoardScopes, scope => scope.board)
    scopes: TrelloBoardScopes[]
}
