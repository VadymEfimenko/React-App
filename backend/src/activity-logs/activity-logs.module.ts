import {Module} from '@nestjs/common';
import {ActivityLogsService} from './activity-logs.service';
import {ActivityLogsController} from './activity-logs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActivityLog} from "./entities/activity-log.entity";
import {TasksService} from "../tasks/tasks.service";
import {Task} from "../tasks/entities/task.entity";
import {TasksModule} from "../tasks/tasks.module";
import {TaskListsModule} from "../task-lists/task-lists.module";

@Module({
    imports: [TypeOrmModule.forFeature([ActivityLog]),
    ],
    controllers: [ActivityLogsController],
    providers: [ActivityLogsService],
    exports: [ActivityLogsService, TypeOrmModule]
})
export class ActivityLogsModule {
}
