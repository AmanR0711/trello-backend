import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrelloList } from "./list.entity";
import { TrelloUser } from "src/users/entities/user.entity";

export enum TrelloListScope {
    READ_ONLY = 'Read Only',
    READ_WRITE = 'Read Write',
}

@Entity()
export class TrelloListScopes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // List ID to which the Scope belongs
    // Many scopes can belong to one list
    @ManyToOne(() => TrelloList, list => list.id)
    list: TrelloList;

    // The Username of the user to which the scope belongs
    @Column()
    @OneToOne(() => TrelloUser, user => user.username)
    username: string;

    // Scope of the List
    @Column()
    scope: TrelloListScope;
}