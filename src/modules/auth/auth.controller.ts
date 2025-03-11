import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { signInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("/signup")
    signup(@Body() dto: AuthDto){
        return this.authService.signup(dto)
    }

    @Post("/signin")
    signin(@Body() dto: signInDto){
        return this.authService.signin(dto)
    }
}