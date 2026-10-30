import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  private users: User[] = [];
  create(createUserDto: CreateUserDto) {
    const user: User ={
      id: this.users.length +1 ,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u=> u.id === id);
    if(!user){
      throw new NotFoundException('User with id ${id} not found')
    }
    return{status:200, message:'User retrieved successfully',data:user}

  }


  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user=>user.id === id);
    if(index === -1){
      throw new NotFoundException('User with id ${id} not found')
    }
    this.users[index]= {
      ...this.users[index],
      ...updateUserDto
    };
    return{status:200, message:'User upgrated successfully',data : this.users[index]};
  }

  remove(id: number) {
    const index = this.users.findIndex(user=>user.id === id);
    if(index === -1){
      throw new NotFoundException('User with id ${id} not found');
    }
    this.users.splice(index,1);
    return {status:200, message:'User removed successfully', data : {}};
  }
}
