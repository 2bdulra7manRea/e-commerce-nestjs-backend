import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,MongooseModule.forFeature([{name:"Users" , schema:userSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
