import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Array<Task> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createPostDto: CreateTaskDto): Task {
    return this.tasksService.createNewTask(createPostDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string): Task {
    return this.tasksService.removeTask(id);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateTask: CreateTaskDto): Task {
    return this.tasksService.updateTask(id, updateTask);
  }
}
