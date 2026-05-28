import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() loginDto:LoginDto) {
        console.log("login dto: ", loginDto);
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        console.log("register dto: ", registerDto);
        return this.authService.register(registerDto);
    }

    // @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log("user: ", req);
        return req.user;
    }

}
