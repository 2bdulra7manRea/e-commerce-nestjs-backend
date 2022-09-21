import { Module } from '@nestjs/common';
import { OrdersBasketService } from './orders-basket.service';
import { OrdersBasketController } from './orders-basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ordersBasketSchema } from './entities/orders-basket.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"ordersBasket" , schema:ordersBasketSchema}])],
  controllers: [OrdersBasketController],
  providers: [OrdersBasketService]
})
export class OrdersBasketModule {}
