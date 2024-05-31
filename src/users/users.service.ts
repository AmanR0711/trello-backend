import { ConflictException, Injectable } from '@nestjs/common';

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
      // Duplicate username 
      throw new ConflictException(`Username "${createUserDto.username}" is already being used`);
    }
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

  // Profile picture uploader
  uploadAvatar(avatar: Express.Multer.File) {
    console.log(avatar);
  }
}
