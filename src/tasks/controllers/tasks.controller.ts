import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { SearchTaskDto } from '../dto/search-task.dto';
import { Task, TaskStatus } from '../models/task.model';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { TasksService } from '../providers/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('search')
  searchTasks(@Query(ValidationPipe) searchTasks: SearchTaskDto) {
    if (Object.keys(searchTasks).length) {
      return this.tasksService.filterTasks(searchTasks);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get()
  getAllTasks(): Array<Task> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createPostDto: CreateTaskDto): Task {
    return this.tasksService.createNewTask(createPostDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string): Task {
    return this.tasksService.removeTask(id);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTask(id, status);
  }
}
