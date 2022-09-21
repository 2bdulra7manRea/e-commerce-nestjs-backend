import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class AuthService{

constructor(private jwtService:JwtService){}

async generateToken(user:any){

const payload = {userType:user.userType , loc:user._id , username:user.email}

const token = await this.jwtService.sign(payload)

return token

}


async getUserdataFromToken(token:string){
    try {
        const verify= await this.jwtService.verify(token)
        if(!!verify){
            const decode= this.jwtService.decode(token)
            return decode;
        }   
    } catch (error) {
     return error   
    }
}




}