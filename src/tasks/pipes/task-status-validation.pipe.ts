import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../models/task.model';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  private readonly ALLOWED_STATUSES: Array<string> = Object.keys(TaskStatus);

  transform(status: string): string {
    const checkStatus: boolean = this.ALLOWED_STATUSES.includes(
      status.trim().toUpperCase(),
    );
    if (!checkStatus) {
      throw new BadRequestException(`The status #${status} is not allowed!`);
    }
    return status;
  }
}
