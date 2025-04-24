import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObjectId } from 'typeorm';
// import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('CreateUser')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async create(@Body() createUserDto: CreateUserDto) {
    var holder = await this.userService.create(createUserDto);

    // console.log(holder);

    return holder;
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get('GetUserByEmail/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('GetUserById/:id')
  getUserById(@Body() id: ObjectId) {
    return this.userService.findById(id);
  }

  @Patch('UpdateUser:id')
  update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('DeleteUser:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
