import { Injectable,  ConflictException, NotFoundException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from '../../BaseEntities/Response';
import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const { email, password } = createUserDto;
    const UserResponse = new Response<User>;
    const UserData = new User;

    try
    {
        // Check if user exists
      const existingUser = await this.usersRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      UserData.Email = createUserDto.email;
      UserData.PasswordHash = hashedPassword;
      UserData.Username = createUserDto.username;
      UserData.CreatedAt = new Date();
      UserData.UpdatedAt = new Date();

      
      const user = this.usersRepository.create(UserData);
      
      await this.usersRepository.save(user);

      UserResponse.Data = UserData;
      UserResponse.Message = "User Created Successfully";
      UserResponse.StatusCode = HttpStatus.CREATED;
      UserResponse.Success = true;
    }
    catch(e)
    {
      UserResponse.Data = e;
      UserResponse.Message = "Error Creating User";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async findByEmail(email: string) {
    const UserResponse = new Response<User>;
    try{
     var UserData = await this.usersRepository.findOne({ where: {Email: email } });
    
     if(UserData == null)
     {
      // UserResponse.Data = null;
      UserResponse.Message = "User not found";
      UserResponse.StatusCode = HttpStatus.CREATED;
      UserResponse.Success = true;
      return UserResponse
     }
     UserResponse.Data = UserData;
     UserResponse.Message = "User fetched Successfully";
     UserResponse.StatusCode = HttpStatus.OK;
     UserResponse.Success = true;
     return UserResponse
    }
    catch(e)
    {
      throw new NotFoundException('User not found');
    }
  }

  async findById(id: ObjectId): Promise<User> {
    const user = await this.usersRepository.findOne({ where: {_id : id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
