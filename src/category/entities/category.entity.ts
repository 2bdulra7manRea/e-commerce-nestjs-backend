import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Category {

@Prop({required:true , unique:true})
title:string    

@Prop()
description:string

@Prop({type:[{name:String}] , default:[]})
subCategory:[object]

}

export type categoryDocument=Category & Document;
export const categorySchema=SchemaFactory.createForClass(Category)