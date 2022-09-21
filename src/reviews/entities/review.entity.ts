import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


//* first approach 
// *make embeded documents inside reivew ; hard in updating and size , easy insert / get

// *second approach
// *make relation with new Scheam of reivewuser and put id in ; easy update / easy insert / easy get

// *third approach big size of collection can hold many documents for same users
// ! hard to filter 
// *make one collection hold all reivews 

@Schema({timestamps:true})
export class Review {

@Prop({ref:"Products" , required:true})  
productId:string

@Prop({ref:"Customers"})
customerId:string

@Prop()
reviewContent:string

@Prop({default:0})
rate:number

// @Prop({type:{}})
// reivewRaplys:[object]

}


export type reviewDocument= Review & Document

export const reviewsSchema=SchemaFactory.createForClass(Review)