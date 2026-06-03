import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>, private jwtService: JwtService) {}

    async login(loginDto: LoginDto):Promise<{accessToken: string, role: string, name:string,_id:string}> {
        const UserExist = await this.userModel.findOne({userEmail: loginDto.email});

        if (!UserExist) {
            throw new Error('User not found or invalid credentials');
        }

        if(UserExist.userPassword != loginDto.password){
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {sub:UserExist._id, email:UserExist.userEmail, role:UserExist.userRole};
        return {
            accessToken:await this.jwtService.signAsync(payload),
            role:UserExist.userRole,
            name:UserExist.userName,
            _id:String(UserExist._id)
        }
    }

    async register(registerDto: RegisterDto) {
        const isUserExist = await this.userModel.findOne({userEmail:registerDto.email});
        if(isUserExist) {
            throw new Error('User with this email already exists');
        }

        if(registerDto.password !== registerDto.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        let userId = 1;

        const newUser = new this.userModel({
            userId: userId++,
            userName: registerDto.name,
            userEmail: registerDto.email,
            userPassword: registerDto.password,
            userRole: registerDto.role
        });

        await newUser.save();
        const payload = {sub:newUser._id, email:newUser.userEmail, role:newUser.userRole};
        return {
            accessToken:await this.jwtService.signAsync(payload),
            role:newUser.userRole,
            name:newUser.userName,
            _id:String(newUser._id)
        }

    }
}
