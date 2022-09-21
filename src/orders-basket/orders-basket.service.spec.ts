import { Test, TestingModule } from '@nestjs/testing';
import { OrdersBasketService } from './orders-basket.service';

describe('OrdersBasketService', () => {
  let service: OrdersBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersBasketService],
    }).compile();

    service = module.get<OrdersBasketService>(OrdersBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
