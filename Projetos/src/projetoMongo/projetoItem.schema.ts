import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProjetoItem extends Document {
  @Prop({ required: true })
  WBS: string;

  @Prop({ required: true })
  __rowNum__: number;
}

export const ProjetoItemSchema = SchemaFactory.createForClass(ProjetoItem);