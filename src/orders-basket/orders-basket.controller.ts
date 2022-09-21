import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersBasketService } from './orders-basket.service';
import { CreateOrdersBasketDto } from './dto/create-orders-basket.dto';
import { UpdateOrdersBasketDto } from './dto/update-orders-basket.dto';

@Controller('orders-basket')
export class OrdersBasketController {
  constructor(private readonly ordersBasketService: OrdersBasketService) {}

  @Post()
  createNewProductInBasket(@Body() createOrdersBasketDto: CreateOrdersBasketDto) {
    return this.ordersBasketService.createNewProductInBasket(createOrdersBasketDto);
  }

  @Get()
  findAll() {
    return this.ordersBasketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // ! id is customerId
    return this.ordersBasketService.findUserOrderBasket(id);
  }

  @Patch('')
  update(@Body() BasketDto: UpdateOrdersBasketDto) {
    return this.ordersBasketService.removeFromMyOrderBasket(BasketDto.customerId,BasketDto.productId);
  }

  @Patch('quantity')
  decreaseProducts(@Body() BasketDto: UpdateOrdersBasketDto) {
    return this.ordersBasketService.decreaseProductsInOrderBasket(BasketDto.customerId,BasketDto.productId);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersBasketService.remove(+id);
  }
}
