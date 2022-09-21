import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Request } from 'express';
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  register(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.register(createAccountDto);
  }

  @Post('/login')
  login(@Body() createAccountDto: CreateAccountDto) {
    console.log('login_______here')
    return this.accountService.login(createAccountDto);
  }

  
  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get('/me')
  findOne(@Req()req :Request){
    return this.accountService.getMyAccountInfo(req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
