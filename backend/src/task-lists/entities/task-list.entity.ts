import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Task} from "../../tasks/entities/task.entity";



@Entity({name: 'task_lists'})
export class TaskList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Task, task => task.taskList, { cascade: true })
    tasks: Task[];
}
