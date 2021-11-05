import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository} from 'typeorm'
import { UserModel } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
        private repository: Repository<UserModel>,
  ){

  }
  async create(dto: CreateUserDto): Promise<UserModel> {
    const {name, password, email} = dto
    
    return await this.repository.save({ 
      createdAt: Date.now(),
      email, name, password
    })
  }

  async findAll(): Promise<UserModel[]> {
    return await this.repository.find()
  }

  async findOne(id: number): Promise<UserModel> {
    return await this.repository.findOne({id})
  }

  async update(id: number, dto: UpdateUserDto): Promise<void> {
    const {name, email} = dto
    await this.repository.update(id, {name, email})
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({id})
  }
}
