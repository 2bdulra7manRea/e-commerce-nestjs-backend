import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class Seller {

@Prop()
brandName:string

@Prop({default:0})
sellerScore:number

@Prop({type:{customerRating:String}})
performance:object

@Prop()
brandCountry:string 

@Prop({type:{startDate:String,successfulSales:{type:Number , default:0}}})
Information:object

@Prop({type:mongoose.Schema.Types.ObjectId , ref:"Users"})
userId:string

@Prop()
image:string

}
export type sellerDocuments = Seller & Document
export const sellerSchema =  SchemaFactory.createForClass(Seller)