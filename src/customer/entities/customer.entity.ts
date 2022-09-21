import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


@Schema({timestamps:true})
export class Customer {

@Prop()
image:string

@Prop({type:mongoose.Schema.Types.ObjectId , ref:"Users"})
userId:string

}


export type customerDocument = Customer & Document
export const customerSchema=SchemaFactory.createForClass(Customer)