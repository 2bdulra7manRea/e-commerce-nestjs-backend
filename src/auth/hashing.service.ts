
import { Injectable } from "@nestjs/common";
import *  as bcrypt from "bcrypt";
 

@Injectable()
export class HashingService{


async hash(password){
    const round = 10;
    const salt = await bcrypt.genSalt(round)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
};




async isMatch(password,encrypted){
    return await bcrypt.compare(password,encrypted)
}








}