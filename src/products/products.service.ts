import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsDocuments } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private productsModel: Model<productsDocuments>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsModel.create(createProductDto);
  }

  findAll(filter?) {
    return this.productsModel.find(filter).skip(0).limit(20);
  }

  async sort(filter, query: any) {
    const { skip, limit, order, sort } = query;
    const skip1: number = skip ? Number(skip) : 0;
    const limit1: number = limit ? Number(limit) : 20;
    const ren = order === 'ASC' ? 1 : -1;
    const count = await this.productsModel.find(filter).count();
    const result = await this.productsModel
      .find(filter, {}, { sort: { [sort]: ren } })
      .skip(skip1)
      .limit(limit1);

    return { items: result, length: count };
  }

  findOne(id: string) {
    return this.productsModel.findById(id).populate('sellerId');
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsModel.updateOne({ _id: id }, updateProductDto);
  }

  remove(id: string) {
    return this.productsModel.deleteOne({ _id: id });
  }
}
