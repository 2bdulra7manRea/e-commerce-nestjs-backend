import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { customerSchema } from './entities/customer.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'Customers' , schema:customerSchema}])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports:[CustomerService]
})
export class CustomerModule {}
