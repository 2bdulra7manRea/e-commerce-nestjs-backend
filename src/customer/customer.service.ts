import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customerDocument } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(@InjectModel("Customers") private customerModel :Model<customerDocument>){}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customerModel.create(createCustomerDto)
  }

  findAll() {
    return this.customerModel.find();
  }

  findOne(filter) {
    return this.customerModel.findOne(filter);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.updateOne({_id:id},updateCustomerDto)
  }

  remove(id: string) {
    return this.customerModel.deleteOne({_id:id});
  }
}
