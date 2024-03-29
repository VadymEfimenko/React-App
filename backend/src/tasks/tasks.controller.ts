import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    const newTask = this.tasksService.create(createTaskDto);
    if (!newTask) {
      throw new HttpException('Failed to create a task', HttpStatus.BAD_REQUEST);
    }
    return newTask;
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Get('task-list/:id')
  findAllTasksByTaskListId(@Param('id') id: string){
    return this.tasksService.findAllTasksByTaskListId(+id);
  }
}
