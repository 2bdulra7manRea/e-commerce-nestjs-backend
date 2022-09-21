import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryService {


  constructor(@InjectModel('Categories') private categoriesModel:Model<categoryDocument>){}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesModel.create(createCategoryDto)
  }

  findAll() {
    return this.categoriesModel.find()
  }

  findOne(id:string) {
    return this.categoriesModel.findById(id)
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesModel.updateOne({_id:id},updateCategoryDto);
  }

  remove(id: string) {
    return this.categoriesModel.deleteOne({_id:id});
  }
}
