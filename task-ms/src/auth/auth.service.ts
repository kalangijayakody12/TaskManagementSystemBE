import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>) {}

    async login(loginDto: LoginDto) {

        const UserExist = await this.userModel.findOne({userEmail: loginDto.email});

        if (!UserExist) {
            throw new Error('User not found or invalid credentials');
        }

        if(UserExist.userPassword != loginDto.password){
            throw new Error('Invalid credentials');
        }

        //return token

        return true;
    }


    async register(registerDto: RegisterDto) {

        if(registerDto.password !== registerDto.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        const isUserExist = await this.userModel.findOne({userEmail:registerDto.email});

        if(isUserExist) {
            throw new Error('User with this email already exists');
        }

        let userId = 1;

        const newUser = new this.userModel({
            userId: userId++,
            userName: registerDto.name,
            userEmail: registerDto.email,
            userPassword: registerDto.password,
            userRole: registerDto.role
        });

        return newUser.save();
    }
}
