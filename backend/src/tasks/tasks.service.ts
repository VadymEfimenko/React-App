import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from "./entities/task.entity";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TaskListsService} from "../task-lists/task-lists.service";
import {ActivityLogsService} from "../activity-logs/activity-logs.service";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
        private taskListService: TaskListsService,
        private activityLogsService: ActivityLogsService,
    ) {
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        let newTask = this.tasksRepository.create(createTaskDto);

        if (createTaskDto.taskListId) {
            newTask.taskList = await this.taskListService.findOne(createTaskDto.taskListId);
        }

        newTask = await this.tasksRepository.save(newTask);

        await this.activityLogsService.logActivity(
            newTask,
            "created",
            `You created ${newTask.title} of ${newTask.priority} priority in ${newTask.taskList.name}`,
        )
        return newTask;
    }

    findAll() {
        return this.tasksRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({id: id})
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {

        const task = await this.tasksRepository.findOne({
            where: { id: id },
            relations: ['taskList']
        });
        if (!task) {
            throw new NotFoundException(`Task #${id} not found`);
        }

        await this.checkUpdateChanges(updateTaskDto, task);

        await this.tasksRepository.save(task);
        return task;
    }

    async remove(id: number){
        await this.tasksRepository.delete(id);
    }

    async findAllTasksByTaskListId(taskListId: number): Promise<Task[]> {
        return this.tasksRepository.find({
            where: { taskList: { id: taskListId } },
            order: {
                updatedAt: "DESC", // "ASC" for ascending, "DESC" for descending
            },
        });
    }


    async checkUpdateChanges(updateTaskDto : UpdateTaskDto, task : Task){
        if (updateTaskDto.title! && updateTaskDto.title !== task.title) {
            await this.activityLogsService.create({
                task: task,
                actionType: "renamed",
                description: `You renamed ${task.title} to ${updateTaskDto.title}`,
                timestamp: new Date()
            })
            task.title = updateTaskDto.title;
        }
        if (updateTaskDto.taskListId! && updateTaskDto.taskListId !== task.taskList.id){
            let newTaskList = await this.taskListService.findOne(updateTaskDto.taskListId);
            await this.activityLogsService.create({
                task: task,
                actionType: "moved",
                description: `You moved ${task.title} from ${task.taskList.name} to ${newTaskList.name}`,
                timestamp: new Date()
            })
            task.taskList = newTaskList;
        }
        if (updateTaskDto.priority! && updateTaskDto.priority !== task.priority){
            await this.activityLogsService.create({
                task: task,
                actionType: "changed the priority",
                description: `You changed the priority ${task.title} from ${task.priority} to ${updateTaskDto.priority}`,
                timestamp: new Date()
            })
            task.priority = updateTaskDto.priority;
        }
        if (updateTaskDto.description! && updateTaskDto.description !== task.description){
            await this.activityLogsService.create({
                task: task,
                actionType: "changed the description",
                description: `You changed the description ${task.title}`,
                timestamp: new Date()
            })
            task.description = updateTaskDto.description;
        }
        if (updateTaskDto.dueDate! && updateTaskDto.dueDate !== task.dueDate){
            await this.activityLogsService.create({
                task: task,
                actionType: "changed due date",
                description: `You changed due date of ${task.title} from ${task.dueDate} to ${updateTaskDto.dueDate}`,
                timestamp: new Date()
            })
            task.dueDate = updateTaskDto.dueDate;
        }
    }
}
