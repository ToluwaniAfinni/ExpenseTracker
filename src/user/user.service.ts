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
import { CreateUserResponseDto } from '../user/dto/CreateUserResponseDto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const { email, password } = createUserDto;
    const UserResponse = new Response<CreateUserResponseDto>;
    const UserData = new User;

    try
    {
        // Check if user exists

      const existingUser = await this.usersRepository.findOne({ where: { Email: email } });

      console.log("Hello", existingUser);

      if (existingUser !== null) {
        // throw new ConflictException('Email already exists');
        UserResponse.Data = existingUser;
        UserResponse.Message = "Email already exists";
        UserResponse.StatusCode = HttpStatus.CONFLICT;
        UserResponse.Success = false;
        return UserResponse;
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

      const CreatedUserResp = new CreateUserResponseDto(
        UserData.Username, UserData.Email,
        UserData.CreatedAt, UserData.UpdatedAt
      )

      UserResponse.Data = CreatedUserResp;
      UserResponse.Message = "User Created Successfully";
      UserResponse.StatusCode = HttpStatus.CREATED;
      UserResponse.Success = true;
      return UserResponse;
    }
    catch(e)
    {
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
      UserResponse.StatusCode = HttpStatus.CONFLICT;
      UserResponse.Success = false;
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
      console.log(e);
      // UserResponse.Data = null;
      UserResponse.Message = "Error fetching User";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async findById(id: ObjectId){
    const UserResponse = new Response<User>;

    try{
      const UserData = await this.usersRepository.findOne({ where: {_id : id } });

      if (UserData == null) {
        // UserResponse.Data = null;
        UserResponse.Message = "User not found";
        UserResponse.StatusCode = HttpStatus.CONFLICT;
        UserResponse.Success = false;
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
      console.log(e);
      UserResponse.Message = "Error fetching User";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto){

    const UserResponse = new Response<User>;

    try{
        const user = await this.findById(id);

        if(user.Data == null)
        {
          UserResponse.Message = "User not found";
          UserResponse.StatusCode = HttpStatus.CONFLICT;
          UserResponse.Success = false;
          return UserResponse
        }
        
        if (updateUserDto.password) {
          updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        
        Object.assign(user.Data, updateUserDto);

        await this.usersRepository.save(user.Data);

        UserResponse.Data = user.Data;
        UserResponse.Message = "User Updated Successfully";
        UserResponse.StatusCode = HttpStatus.OK;
        UserResponse.Success = true;
        return UserResponse
    }
    catch(e)
    {
      console.log(e);
      UserResponse.Message = "Error updating User";
      UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      UserResponse.Success = false
      return UserResponse;
    }
  }


  async remove(id: number){
      const UserResponse = new Response<User>;

      try
      {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
          UserResponse.Message = "User not found";
          UserResponse.StatusCode = HttpStatus.CONFLICT;
          UserResponse.Success = false;
          return UserResponse
      }
    }
      catch(e)
      {
        console.log(e);
        UserResponse.Message = "Error deleting user User";
        UserResponse.StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        UserResponse.Success = false
        return UserResponse;
      }
    }
  }

