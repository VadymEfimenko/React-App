import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Task} from "../../tasks/entities/task.entity";



@Entity({name: 'activity_logs'})
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Task,{
        onDelete: 'CASCADE'
    })
    task: Task;

    @Column()
    actionType: string;

    @Column('text')
    description: string;

    @Column()
    timestamp: Date;
}
