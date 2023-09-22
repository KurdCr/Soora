import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.interface';
import { CreateUserDto, SignInUserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;
    return this.userService.signIn(email, password);
  }
}
