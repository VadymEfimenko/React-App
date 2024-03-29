import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {TaskList} from "../../task-lists/entities/task-list.entity";
import {TaskPriority} from "./task-priority";



@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    dueDate: Date;

    @Column({
        type: "enum",
        enum: TaskPriority,
        default: TaskPriority.LOW
    })
    priority: TaskPriority;

    @ManyToOne(() => TaskList, taskList => taskList.tasks,
        {
            onDelete: 'CASCADE'
        })
    taskList: TaskList;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
