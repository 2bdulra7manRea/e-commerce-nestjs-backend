import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { SellerModule } from 'src/seller/seller.module';
import { CustomerModule } from 'src/customer/customer.module';
import { AccountFactory } from './accountFactoryservice';

@Module({
  imports:[AuthModule,UsersModule,SellerModule,CustomerModule],
  controllers: [AccountController],
  providers: [AccountService,AccountFactory],
  exports:[AccountService]
})
export class AccountModule {}
