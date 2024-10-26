import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema({ timestamps: true })
export class Orders {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

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

  @Prop()
  shippingAddress: string;

  @Prop()
  paymentMethod: string;

  @Prop()
  trackingNumber: string;

  @Prop()
  notes: string;
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
