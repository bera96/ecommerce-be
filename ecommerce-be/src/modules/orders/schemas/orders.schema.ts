import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema({ timestamps: true })
export class Orders {
  @ApiProperty({ description: 'User ID' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'Total amount' })
  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product' },
        name: String,
        image: String,
        quantity: Number,
        price: Number,
        totalAmount: Number,
      },
    ],
  })
  items: Array<{
    productId: Types.ObjectId;
    name: string;
    image: string;
    quantity: number;
    price: number;
    totalAmount: number;
  }>;

  @ApiProperty({ description: 'Tracking number' })
  @Prop({ required: true })
  trackingNumber: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);

OrdersSchema.pre('save', function (next) {
  if (this.isModified('items')) {
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    this.items.forEach((item) => {
      item.totalAmount = item.price * item.quantity;
    });
  }
  next();
});
