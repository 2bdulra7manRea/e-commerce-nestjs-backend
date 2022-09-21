import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { HashingService } from 'src/auth/hashing.service';
import { CustomerService } from 'src/customer/customer.service';
import { USER_TYPE } from 'src/enum/userTypes';
import { SellerService } from 'src/seller/seller.service';
import { UsersService } from 'src/users/users.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Request } from 'express';
import { AccountFactory } from './accountFactoryservice';
import { accountResponseFailed, accountResponseSuccess } from 'src/helpers/responses/account.response';
@Injectable()
export class AccountService {
  constructor(
    private authService: AuthService,
    private hashService: HashingService,
    private userService: UsersService,
    private sellerService: SellerService,
    private customerService:CustomerService,
    private accountFactory:AccountFactory,
  ) {}

  async getMyAccountInfo(req:Request){
    const token = req.headers['authorization'];


    const decode  = await this.authService.getUserdataFromToken(token);
    const user = await this.userService.findOne({_id:decode.loc})
    if(!user || !user._id){
      return {}
    }
    switch (user.userType) {
      case USER_TYPE.SELLER:
        const seller =await this.sellerService.findOne({userId:user._id})
        return {securityUserId:seller._id , userType:"seller"}
      case USER_TYPE.CUSTOMER:
        const customer =await this.customerService.findOne({userId:user._id})
        return {securityUserId:customer._id , userType:"customer"}
      default:
        return{securityUserId:"" , userType:""}
    }
  }


  async login(accountDto: CreateAccountDto) {
    const user = await this.userService.findOne({ email: accountDto.email });

    if (!user || !user._id) {
      // not Auth
      return accountResponseFailed("User is not authenticated'")
    }

    const isMatch = await this.hashService.isMatch(
      accountDto.password,
      user.password,
    );

    if (!isMatch) {
      return accountResponseFailed("User is not authenticated'")
    }
    const access_token = await this.authService.generateToken(user);
    return accountResponseSuccess(access_token,user)
  }


  async register(createAccountDto: CreateAccountDto) {
    const user = await this.userService.create(createAccountDto);

    await this.accountFactory.assignAccountToUser(createAccountDto,user._id)
    
    const access_token = await this.authService.generateToken(user);

    return accountResponseSuccess(access_token,user)

  }

  findAll() {
    return `This action returns all account`;
  }

  async userLogOut(){
    return;
  }

 async userProfile(token:string){

const decodeInfo=await this.authService.getUserdataFromToken(token)
 const id = decodeInfo.loc;
  return await this.userService.findOne({_id:id},{password:0})
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  verified() {
    return '';
  }

  forgetPassword() {
    return '';
  }

  block() {
    return '';
  }

  unblock() {
    return '';
  }
}
