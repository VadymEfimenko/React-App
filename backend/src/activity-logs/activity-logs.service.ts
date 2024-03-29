import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ActivityLog} from "./entities/activity-log.entity";
import {Repository} from "typeorm";
import {TasksService} from "../tasks/tasks.service";
import {Task} from "../tasks/entities/task.entity";

@Injectable()
export class ActivityLogsService {
  constructor(
      @InjectRepository(ActivityLog)
      private activityLogsRepository: Repository<ActivityLog>,
  ) {}
  async create(createActivityLogDto: CreateActivityLogDto) : Promise<ActivityLog> {
    let newActivityLog = this.activityLogsRepository.create(createActivityLogDto);
    await this.activityLogsRepository.save(newActivityLog);
    return newActivityLog;
  }

  findAll() {
    return `This action returns all activityLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityLog`;
  }

  update(id: number, updateActivityLogDto: UpdateActivityLogDto) {
    return `This action updates a #${id} activityLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityLog`;
  }

  async logActivity(task: Task, actionType: string, description: string) {
    const activityLogDto = {
      task,
      actionType,
      description,
      timestamp: new Date(),
    };
    await this.create(activityLogDto);
  }
}
