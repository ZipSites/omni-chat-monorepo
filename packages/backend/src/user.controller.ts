import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_user' })
  getUser(@Payload() data: { userId: number }): {
    id: number;
    name: string;
    email: string;
  } {
    console.log('Received get_user message with payload:', data);
    return this.userService.getUserById(data.userId);
  }
}
