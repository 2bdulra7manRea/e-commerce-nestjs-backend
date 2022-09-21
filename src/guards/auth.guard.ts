import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountService } from "src/account/account.service";




@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if(!token){
        return false
    }
    const user = await this.accountService.userProfile(token);
    if (!!user && !!user._id) {
      return true;
    }
    return false;
  }
}


