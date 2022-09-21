import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { AccountService } from './account/account.service';
import { CategoryModule } from './category/category.module';
import { OrdersBasketModule } from './orders-basket/orders-basket.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
     CustomerModule,
      SellerModule,
       OrdersModule,
       MongooseModule.forRoot("mongodb://localhost:27017/e-shop",{connectionFactory:(connection)=>{
        return connection
       }}),
       AccountModule,
       CategoryModule,
       OrdersBasketModule,
       ReviewsModule,
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
