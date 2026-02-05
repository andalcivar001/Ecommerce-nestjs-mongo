import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { SubCategory } from 'src/sub-category/schema/subcategory.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({ required: false, default: '' })
  codAlterno: string;

  @Prop({ default: '' })
  imagen1: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: 0 })
  precio: number;

  @Prop({ default: '' })
  imagen2: string;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  idCategory: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: SubCategory.name,
    required: true,
  })
  idSubcategory: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
