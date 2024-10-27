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
        quantity: Number,
        price: Number,
      },
    ],
  })
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }>;

  @ApiProperty({ description: 'Shipping address' })
  @Prop({ required: true })
  shippingAddress: string;

  @ApiProperty({ description: 'Payment method' })
  @Prop({ required: true })
  paymentMethod: string;

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
  }
  next();
});
