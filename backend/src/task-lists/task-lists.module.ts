import {Module} from '@nestjs/common';
import {TaskListsService} from './task-lists.service';
import {TaskListsController} from './task-lists.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TaskList} from "./entities/task-list.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TaskList])],
    controllers: [TaskListsController],
    providers: [TaskListsService],
    exports: [TaskListsService, TypeOrmModule],
})
export class TaskListsModule {
}
