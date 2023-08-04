import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/models/repository/repository.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getByEmail(email: string) {
    const user = await this.repoService.userRepo.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'name', 'password'],
    });
    if (user) {
      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'USER_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async create(payload: CreateUserDto) {
    const userData = await this.repoService.userRepo.save(payload);
    return userData;
  }
}
