import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

export type SubCategoryDocument = SubCategory & Document;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: false, trim: true, default: '' })
  descripcion: string;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  idCategory: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
