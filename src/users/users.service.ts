import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TrelloUser } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  // Inject UserRepository (courtesy TypeORM)
  constructor(
    @InjectRepository(TrelloUser)
    private readonly userRepository: Repository<TrelloUser>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<TrelloUser> {
    try {
      const user: TrelloUser = this.userRepository.create(createUserDto);
      const result = await this.userRepository.insert(createUserDto);
      if (result.identifiers.length > 0) {
        return user;
      }
    } catch (e) {
      console.log(e);
      // Duplicate username 
      throw new ConflictException(`Username "${createUserDto.username}" is already being used`);
    }
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const validUser = this.userRepository.findOne({ where: { username } });
    if(!validUser) {
      throw new NotFoundException(`User with username "${username}" not found`);
    } else {
      return await this.userRepository.update(username, updateUserDto);
    }
  }

  async remove(username: string) {
    return await this.userRepository.delete(username);
  }

  // Profile picture uploader
  uploadAvatar(avatar: Express.Multer.File) {
    return {
      fileName: avatar.filename,
      message: "User avatar saved successfully",
    }
  }
}
