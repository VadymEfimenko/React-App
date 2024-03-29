import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import {Task} from "../../tasks/entities/task.entity";

export class CreateActivityLogDto {
    @IsNotEmpty()
    task: Task;

    @IsNotEmpty()
    @IsString()
    actionType: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDate()
    timestamp: Date;
}