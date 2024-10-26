import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema()
export class Categories {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  priority: number;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
