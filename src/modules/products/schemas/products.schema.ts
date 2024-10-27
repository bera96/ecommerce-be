import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { Categories } from 'src/modules/categories/schemas/categories.schema';

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {
  @ApiProperty({ description: 'Product ID' })
  _id: string;

  @ApiProperty({ description: 'Product Name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Product Price' })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ description: 'Product Stock' })
  @Prop({ required: true })
  stock: number;

  @ApiProperty({ description: 'Product Description' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Product Category' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Categories',
    required: true,
  })
  category: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
