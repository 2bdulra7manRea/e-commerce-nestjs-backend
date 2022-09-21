import { Test, TestingModule } from '@nestjs/testing';
import { OrdersBasketController } from './orders-basket.controller';
import { OrdersBasketService } from './orders-basket.service';

describe('OrdersBasketController', () => {
  let controller: OrdersBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersBasketController],
      providers: [OrdersBasketService],
    }).compile();

    controller = module.get<OrdersBasketController>(OrdersBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
