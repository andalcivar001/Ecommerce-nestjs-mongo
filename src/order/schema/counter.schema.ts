import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
  @Prop({ required: true, unique: true })
  sequence_name: string;

  @Prop({ required: true, default: 0 })
  sequence_value: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
