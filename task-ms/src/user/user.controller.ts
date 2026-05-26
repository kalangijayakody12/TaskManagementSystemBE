import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }

  @Get()
  findAll() {
    console.log("Received request to get all users");
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOneUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }
}
