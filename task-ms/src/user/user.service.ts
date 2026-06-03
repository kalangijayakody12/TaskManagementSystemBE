import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}
  
  async createNewUser(createUserDto:CreateUserDto):Promise<User>{
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    console.log("New user created:", newUser);
    return newUser;
  }

  async findAllUsers() {
    return await this.userModel.find().exec();
  }

  async findOneUser(id: number){
    const user = await this.userModel.findOne({userId:id});
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async removeUser(id: number) {
    const deletedUser = await this.userModel.findOneAndDelete({userId:id});
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return deletedUser;
  }
}
