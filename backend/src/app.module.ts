import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TasksModule } from './tasks/tasks.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import ormconfig from "./ormconfig";

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        TasksModule,
        TaskListsModule,
        ActivityLogsModule,

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
