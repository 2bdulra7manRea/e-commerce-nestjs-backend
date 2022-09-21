import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { reviewDocument } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel("reviews") private reivewModel:Model<reviewDocument>){}

  create(createReviewDto: CreateReviewDto) {
    return this.reivewModel.create(createReviewDto)
  }


  findReviewProduct(productId){
   return this.reivewModel.find({productId:productId}).populate(['customerId']).populate({
    path:'customerId',
    populate:{
      path:"userId",
      model:"Users",
    }
   })
  }


  findReviewCustomer(customerId){
    return this.reivewModel.find({customerId:customerId}).populate("productId")
  }

  findAll() {
    return this.reivewModel.find()
  }

  

  findById(id: string) {
    return this.reivewModel.findById(id)
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reivewModel.updateOne({_id:id},updateReviewDto)
  }

  remove(id: string) {
    return this.reivewModel.deleteOne({_id:id});
  }
}
