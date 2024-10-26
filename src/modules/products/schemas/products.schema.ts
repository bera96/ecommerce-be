import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Categories } from 'src/modules/categories/schemas/categories.schema';

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true })
  category: Categories;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
