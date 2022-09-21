import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { sellerSchema } from './entities/seller.entity';

@Module({
  imports:[UsersModule , MongooseModule.forFeature([{name:"Sellers" , schema:sellerSchema}])],
  controllers: [SellerController],
  providers: [SellerService],
  exports:[SellerService]
})
export class SellerModule {}
