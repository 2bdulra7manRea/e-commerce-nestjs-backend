import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({timestamps:true})

export class User {

@Prop({index:true})
username:string

@Prop({required:true})
userType:string

@Prop()
location:string

@Prop({required:true , unique:true , index:true})
email:string

@Prop()
password:string

@Prop({default:false})
is_locked:boolean

@Prop({type:Date})
date_locked:string

@Prop({default:true})
is_verified:boolean

@Prop({type:Date})
last_login:string

@Prop()
login_failed:number

}

export type userDocument = User & Document;
export const userSchema =SchemaFactory.createForClass(User)



