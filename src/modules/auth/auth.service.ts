import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from 'src/models/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        email: registrationData.email.toLowerCase(),
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      // UniqueViolation == 23505
      if (error?.code === 23505) {
        throw new HttpException('EMAIL_ALREADY_EXIST', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'EMAIL_ALREADY_EXIST',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.BAD_REQUEST);
    }
  }

  public generateJwt(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
    };
    return {
      profile: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email.toLowerCase());
      await this.verifyPassword(plainTextPassword, user.password);

      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.BAD_REQUEST);
    }
  }
}
