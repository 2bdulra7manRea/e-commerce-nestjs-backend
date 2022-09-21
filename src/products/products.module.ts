import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {productsSchema } from './entities/product.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports:[AccountModule,MongooseModule.forFeature([{name:"Products" , schema:productsSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService,
  // {
  //   provide:APP_GUARD,
  //   useClass:AuthGuard
  // }
  ]
})
export class ProductsModule {}
