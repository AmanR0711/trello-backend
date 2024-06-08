import { TrelloBoard } from "src/boards/entities/board.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

// Enum for the theme of the Trello user
// The theme can be either 'Light' or 'Dark'
export enum TrelloTheme {
    light = 'Light',
    dark = 'Dark',
};

@Entity({ name: 'trello_user' })
export class TrelloUser {
    @Column({ primary: true, unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    avatarUrl: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @Column()
    theme: TrelloTheme;

    // The user can have multiple boards
    // This is a one-to-many relationship
    @OneToMany(() => TrelloBoard, board => board.creator, { cascade: true })
    boards: string[];
}
