import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  filterTasks(searchTasks: SearchTaskDto): Array<Task> {
    const { status, search } = searchTasks;
    const tasks: Array<Task> = this.getAllTasks();

    if (status) {
      return tasks.filter((task: Task) => task.status === status);
    }

    if (search) {
      return tasks.filter((task: Task) => task.title.includes(search) || task.description.includes(search));
    }
  }

  getTaskById(id: string): Task {
    const existingTask: Task = this.tasks.find((task: Task) => task.id === id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id #${id} not found`);
    } else {
      return existingTask;
    }
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
    if (!removeTask) {
      throw new NotFoundException(`Task with id #${id} not found`);
    } else {
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
      return removeTask;
    }
  }

  updateTask(id: string, status: TaskStatus): Task {
    const existingTask: Task = this.getTaskById(id);
    existingTask.status = status;
    return existingTask;
  }
}
