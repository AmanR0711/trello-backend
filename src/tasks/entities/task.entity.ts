import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrelloList } from "src/lists/entities/list.entity";

@Entity()
export class TrelloTask {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn({type: 'timestamp', default: () => `CURRENT_TIMESTAMP(6)`})
    createdAt: Date;

    @Column()
    completed: boolean;

    // Which list this task belongs to
    // Many tasks can belong to one list
    @ManyToOne(() => TrelloList, list => list.tasks)
    list: TrelloList;
}
