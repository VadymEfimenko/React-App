import { IsString, IsNotEmpty, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import {TaskPriority} from "../entities/task-priority";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dueDate: Date;

    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsOptional()
    taskListId?: number; // Это поле может быть опциональным, если задача не обязательно должна принадлежать списку при создании
}
