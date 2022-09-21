import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model} from 'mongoose';
import { CreateOrdersBasketDto } from './dto/create-orders-basket.dto';
import { UpdateOrdersBasketDto } from './dto/update-orders-basket.dto';
import { orderBasketDocument } from './entities/orders-basket.entity';

const { ObjectId } = mongoose.Types;

@Injectable()
export class OrdersBasketService {
  logger:Logger
  constructor(
    @InjectModel('ordersBasket')
    private ordersBasketsModel: Model<orderBasketDocument>,
  ) {
    this.logger = new Logger()
  }

  create(createOrdersBasketDto: CreateOrdersBasketDto) {
    return this.ordersBasketsModel.create(createOrdersBasketDto);
  }

  async createNewProductInBasket(ordersBasketDto) {
    const { customerId, productId } = ordersBasketDto;

    if (!customerId || !productId) {
      return { success: false };
    }

    const ordersBasket = await this.ordersBasketsModel.findOne({ customerId });

    if (!!ordersBasket && !!ordersBasket._id) {
      return await this.addInMyOrdersBasket(customerId, productId);
    }

    await this.create({
      customerId: customerId,
      totalNumber: 1,
      productIds: [{ productId: productId, quantity: 1 }],
    });
  }

  findOne(filter) {
    return this.ordersBasketsModel.findOne(filter);
  }

  findUserOrderBasket(customerId) {
    return this.ordersBasketsModel.findOne({ customerId }).populate("productIds.productId");
  }

  async addInMyOrdersBasket(customerId, productId) {
      // const id = new ObjectId(productId)
    const ordersBasket = await this.ordersBasketsModel.findOne({ customerId });
    const quantityUpdated = ordersBasket.totalNumber + 1;
    const index = ordersBasket['productIds'].findIndex(
      (obj) => {
         return obj['productId'] === productId}
    );
    if (index > -1) {
  
      ordersBasket['productIds'][index]['quantity'] = ordersBasket['productIds'][index]['quantity'] + 1;

      await this.ordersBasketsModel.findOneAndUpdate(
        { customerId: customerId },
        {
          $set: {
            totalNumber: quantityUpdated,
            productIds: ordersBasket['productIds'],
          },
        },
      );
      // * the product is old
    } else {
      // * the product is new !
      await this.ordersBasketsModel.findOneAndUpdate(
        { customerId: customerId },
        {
          $push: { productIds: { productId: productId, quantity: 1 } },
          $set: { totalNumber: quantityUpdated },
        },
      );
    }
    const result= await this.findUserOrderBasket(customerId)
    return { success: result };
  }

  async removeFromMyOrderBasket(customerId, productId) {
    if (!customerId || !productId) {
      return { success: false };
    }
    await this.ordersBasketsModel.findOneAndUpdate(
      { customerId },
      { $pull: { productIds: { productId: productId } } },
    );
    return { success: true };
  }

  async decreaseProductsInOrderBasket(customerId,productId){

    if (!customerId || !productId) {
      return { success: false };
    }
    const ordersBasket = await this.ordersBasketsModel.findOne({ customerId });
    const index = ordersBasket['productIds'].findIndex(
      (obj) => {
         return obj['productId'] === productId}
    );

    // * number is decreased
    const quantityProduct=ordersBasket['productIds'][index]['quantity']
    if(quantityProduct>1){
    ordersBasket['productIds'][index]['quantity']=quantityProduct-1;
    const quantityUpdated = ordersBasket.totalNumber - 1;
    return await this.ordersBasketsModel.findOneAndUpdate(
      { customerId: customerId },
      {
        $set: {
          totalNumber: quantityUpdated,
          productIds: ordersBasket['productIds'],
        },
      },
    );
    }else{
     return await this.removeFromMyOrderBasket(customerId,productId)
    }  

  }

  update(id: string, updateOrdersBasketDto: UpdateOrdersBasketDto) {
    return this.ordersBasketsModel.updateOne(
      { _id: id },
      updateOrdersBasketDto,
    );
  }
  findAll() {
    return this.ordersBasketsModel.find();
  }

  remove(id: number) {
    return `This action removes a #${id} ordersBasket`;
  }
}
