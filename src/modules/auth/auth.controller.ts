import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginDTO } from './dto/auth.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: AuthLoginDTO, @Request() req) {
    return await this.authService.generateJwt(req.user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }
}
