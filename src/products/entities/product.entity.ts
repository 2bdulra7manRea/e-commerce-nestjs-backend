import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';



export type productsDocuments= Product & Document ;


@Schema({timestamps:true})
export class Product {
  @Prop({ required: true, index: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop()
  delivery: number;

  @Prop()
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' })
  category: string;

  @Prop({type:{code:{type:String},content:{type:String}},_id:false})
  description:object

  @Prop({type:{
    countryOfOrigin:{type: String},
    Material:{type: String},
    brand: {type: String},
    Weight: {type: String},
  },_id:false})
  specification:object
  @Prop()
  information: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sellers' })
  sellerId:string
}

export const productsSchema = SchemaFactory.createForClass(Product)






