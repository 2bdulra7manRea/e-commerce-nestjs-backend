import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersBasketDto } from './create-orders-basket.dto';

export class UpdateOrdersBasketDto extends PartialType(CreateOrdersBasketDto) {
    productId;
    customerId;
}
