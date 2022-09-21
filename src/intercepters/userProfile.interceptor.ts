import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountService } from "src/account/account.service";
import { SellerService } from "src/seller/seller.service";


export class UserProfileInterceptor implements NestInterceptor{

constructor(private accountService:AccountService,private sellerService:SellerService){}

async intercept(context: ExecutionContext, next: CallHandler<any>):Promise<Observable<any>> {
       
const request = context.switchToHttp().getRequest();
const token = request.headers['authorization'];
const user = await this.accountService.userProfile(token) 
const seller = await this.sellerService.findOne({userId:user._id}).select({_id:1})
request.body.sellerId=seller._id

return next.handle()

}




}