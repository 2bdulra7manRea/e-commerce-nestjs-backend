import { Controller, Headers, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerService } from './seller.service';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findSellerInfoById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
