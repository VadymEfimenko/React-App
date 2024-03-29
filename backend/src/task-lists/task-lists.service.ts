import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskListDto} from './dto/create-task-list.dto';
import {UpdateTaskListDto} from './dto/update-task-list.dto';
import {TaskList} from "./entities/task-list.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class TaskListsService {
    constructor(
        @InjectRepository(TaskList)
        private taskListRepository: Repository<TaskList>,
    ) {
    }

    async create(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
        let newTaskList = this.taskListRepository.create(createTaskListDto);
        await this.taskListRepository.save(newTaskList);
        return newTaskList;
    }

    findAll() {
        return this.taskListRepository.find();
    }

    async findOne(id: number): Promise<TaskList> {
        const taskList = await this.taskListRepository.findOneBy({id: id});
        if (!taskList) {
            throw new NotFoundException(`TaskList with ID "${id}" not found`);
        }
        return taskList;
    }

    async update(id: number, updateTaskListDto: UpdateTaskListDto): Promise<TaskList> {
        const taskList = await this.taskListRepository.preload({
            id: id,
            ...updateTaskListDto,
        });
        if (!taskList) {
            throw new NotFoundException(`TaskList with ID "${id}" not found`);
        }
        return this.taskListRepository.save(taskList);
    }

    async remove(id: number) {
        await this.taskListRepository.delete(id);
    }


}
