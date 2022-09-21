import { Prop, Schema } from "@nestjs/mongoose";



@Schema({timestamps:true , _id:false})
export class OrderBasketProduct{

    @Prop({default:0})
    quantity:number
    
    @Prop({ref:"Products"})
    productId:string 
}