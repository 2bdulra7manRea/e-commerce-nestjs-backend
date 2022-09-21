import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { sellerDocuments } from './entities/seller.entity';

@Injectable()
export class SellerService {

  constructor(private userService:UsersService , @InjectModel("Sellers") private sellerModel:Model<sellerDocuments> ){}
 async create(createSellerDto: CreateSellerDto , userId:string) {
            createSellerDto.userId=userId
     await this.sellerModel.create(createSellerDto)
  }

  findAll(filter?) {
    return this.sellerModel.find(filter).skip(0).limit(10)
  }

  findOne(filter) {
    return this.sellerModel.findOne(filter);
  }


  update(id:string, updateSellerDto: UpdateSellerDto) {
    return this.sellerModel.updateOne({_id:id},updateSellerDto);
  }

  findSellerInfoById(id:string){
    return this.sellerModel.findById(id).populate("userId")
  }

  remove(id: string) {
    return `This action removes a #${id} seller`;
  }
}
