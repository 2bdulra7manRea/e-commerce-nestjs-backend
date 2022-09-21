import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { HashingService } from "./hashing.service";



@Module({
imports:[JwtModule.register({
    secret:'GEDICHET_1902'
})],    
providers:[HashingService , AuthService],
exports:[HashingService,AuthService]
})
export class AuthModule{} 