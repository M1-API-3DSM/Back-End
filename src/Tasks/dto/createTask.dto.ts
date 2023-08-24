import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  deadline: string;

  @IsInt()
  value: number;

  @IsString()
  stage: 'ready' | 'in progress' | 'qa' | 'done';
}
