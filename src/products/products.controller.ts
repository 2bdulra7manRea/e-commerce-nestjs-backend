import { Controller, Get, Post,Headers,Body, Patch, Param, Delete,Query , UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // @Get('category')
  // findByCategory(@Headers("category") category:string) {
  //   return this.productsService.findAll({category:category}).populate('category');
  // }


  @Get('category')
  findByCategorySort(@Headers("category") category:string , @Query() query){
  console.log(query);  
    // return this.productsService.sort({category:category},)
  return this.productsService.sort({category:category},query);
  }


  @Get("me")
  findMyProducts(@Headers("sellerId") sellerId) {
    return this.productsService.findAll({sellerId:sellerId});
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id).populate('category');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
