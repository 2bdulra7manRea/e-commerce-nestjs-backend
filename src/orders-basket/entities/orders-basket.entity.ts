import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// before insert into order

@Schema({timestamps:true})
export class OrdersBasket {
  // one to many
  @Prop({
    default: [],
    _id:false,
    timestamps:true,
    type: [
      { quantity:{type:Number , default:0},productId:{type:String,ref: 'Products'} },
    ],
  })
  productIds: [object];

  // one to one
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    unique: true,
    index:true
  })
  customerId: string;

  @Prop({ default: 0 })
  totalNumber: number;
}

export type orderBasketDocument = OrdersBasket & Document;
export const ordersBasketSchema = SchemaFactory.createForClass(OrdersBasket);
