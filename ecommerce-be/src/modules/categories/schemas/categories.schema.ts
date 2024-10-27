import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type CategoriesDocument = HydratedDocument<Categories>;

@Schema()
export class Categories {
  @ApiProperty({ description: 'Category ID' })
  _id: string;

  @ApiProperty({ description: 'Category Name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Priority' })
  @Prop({ required: true })
  priority: number;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
