import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('Testing ProductsController', () => {

  let controller: ProductsController;

  beforeEach(async () => {
    // * before each request , it will be compiled the module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });




  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return true',()=>{

    expect(controller).toBeDefined()

  });

});
