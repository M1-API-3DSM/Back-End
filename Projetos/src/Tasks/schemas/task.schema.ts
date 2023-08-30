import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deadline: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  stage: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
