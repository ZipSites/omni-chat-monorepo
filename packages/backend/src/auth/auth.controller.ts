import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './auth.dto';
import { User } from '@prisma/client';

@Controller() // No path needed for microservice controllers that only use MessagePattern
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register_user' })
  async registerUser(
    @Payload() registerUserDto: RegisterUserDto,
  ): Promise<Omit<User, 'password'>> {
    console.log(
      'AuthController: Received register_user message with payload (email only):',
      registerUserDto.email,
    );
    return this.authService.register(registerUserDto);
  }

  @MessagePattern({ cmd: 'login_user' })
  async loginUser(
    @Payload() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
    console.log(
      'AuthController: Received login_user message with payload (email only):',
      loginUserDto.email,
    );
    return this.authService.login(loginUserDto);
  }
}
