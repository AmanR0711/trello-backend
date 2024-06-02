import { Column, CreateDateColumn, Entity, Generated, ManyToOne, UpdateDateColumn } from "typeorm";

import { TrelloUser } from "src/users/entities/user.entity";

@Entity()
export class TrelloBoard {
    // Unique identifier for the board
    @Column({ primary: true, unique: true })
    @Generated('uuid')
    id: string;

    // Name of the board
    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;
    
    // Creator of the board
    // One user can create multiple boards
    @ManyToOne(() => TrelloUser, user => user.boards)
    creator: TrelloUser;
}
