import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CartItem = {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
};

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @ApiProperty({ description: 'User ID' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'Cart items' })
  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
  })
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;

  @ApiProperty({ description: 'Total amount' })
  @Prop({ default: 0 })
  totalAmount: number;

  @ApiProperty({ description: 'Expires at' })
  @Prop({ type: Date, default: () => new Date(Date.now() + 1 * 60 * 60 * 1000) })
  expiresAt: Date;

  @Prop({ type: String, enum: ['paid', 'unpaid'], default: 'unpaid' })
  status: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

CartSchema.pre('save', function (next) {
  if (this.isModified('items')) {
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    this.items.forEach((item) => {
      item.totalPrice = item.price * item.quantity;
    });
  }
  next();
});
