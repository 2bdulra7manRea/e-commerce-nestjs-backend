import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reviewsSchema } from './entities/review.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'reviews' , schema:reviewsSchema}])],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
