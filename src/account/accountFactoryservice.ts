import { Injectable } from "@nestjs/common";
import { CustomerService } from "src/customer/customer.service";
import { USER_TYPE } from "src/enum/userTypes";
import { SellerService } from "src/seller/seller.service";

@Injectable()
export class AccountFactory{


constructor(
    private sellerService: SellerService,
    private customerService:CustomerService,
){};


async assignAccountToUser(data,userId){
    switch (data.userType) {
        case USER_TYPE.CUSTOMER:
        await this.customerService.create({...data,userId:userId})
        break;
        case USER_TYPE.SELLER:
        await this.sellerService.create(data , userId);
        break;
        default:
          break;
      }

    return {success:true} ;
}





}