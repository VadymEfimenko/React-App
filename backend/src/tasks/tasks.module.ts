import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {TasksController} from './tasks.controller';
import {Task} from "./entities/task.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TaskList} from "../task-lists/entities/task-list.entity";
import {TaskListsService} from "../task-lists/task-lists.service";
import {TaskListsModule} from "../task-lists/task-lists.module";
import {ActivityLogsModule} from "../activity-logs/activity-logs.module";

@Module({
    imports: [TypeOrmModule.forFeature([Task]),
        TaskListsModule, ActivityLogsModule],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService, TypeOrmModule],
})
export class TasksModule {
}
