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
    return await this.repository.save(dto)
  }

  async findAll(): Promise<UserModel[]> {
    return await this.repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
