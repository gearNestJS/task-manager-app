import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create-task.dto';
import { title } from 'process';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }

  createNewTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  removeTask(id: string): Task {
    const removeTask: Task = this.getTaskById(id);
    if (removeTask) {
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    }
    return removeTask;
  }

  updateTask(id: string, updateTask: CreateTaskDto): Task {
    const { title, description } = updateTask;
    const existingTask: Task = this.getTaskById(id);
    if (existingTask) {
      existingTask.title = title,
      existingTask.description = description
    }
    return existingTask;
  }
}
