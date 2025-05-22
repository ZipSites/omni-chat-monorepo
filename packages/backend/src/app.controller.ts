import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendMessageDto } from './chat/chat.interface';
import { RegisterUserDto, LoginUserDto } from './auth/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service'; // Import AppService

@Controller()
export class AppController {
  [x: string]: any;
  constructor(
    private readonly appService: AppService, // Inject AppService
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('CHAT_SERVICE') private readonly chatServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  @Get() // Add a root Get endpoint
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.userServiceClient.send({ cmd: 'get_user' }, { userId: id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('chat/send')
  sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatServiceClient.send({ cmd: 'send_message' }, sendMessageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('chat/messages/:userId')
  getMessagesForUser(@Param('userId') userId: string) {
    return this.chatServiceClient.send(
      { cmd: 'get_messages_for_user' },
      { userId },
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('chat/messages')
  getAllChatMessages() {
    return this.chatServiceClient.send({ cmd: 'get_all_chat_messages' }, {});
  }

  @Post('auth/register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authServiceClient.send(
      { cmd: 'register_user' },
      registerUserDto,
    );
  }

  @Post('auth/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authServiceClient.send({ cmd: 'login_user' }, loginUserDto);
  }
}
