import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto:LoginDto) {
        console.log("login dto: ", loginDto);
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        console.log("register dto: ", registerDto);
        return this.authService.register(registerDto);
    }

}
