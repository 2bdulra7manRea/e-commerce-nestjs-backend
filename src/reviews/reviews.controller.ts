import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('product/:id')
  findReviewsByProduct(@Param('id') id: string) {
    return this.reviewsService.findReviewProduct(id);
  }

  @Get('customer/:id')
  findReviewsByCustomer(@Param('id') id: string) {
    return this.reviewsService.findReviewCustomer(id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
