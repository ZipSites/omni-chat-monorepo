import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  UseGuards,
  Request, // Import Request
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendMessageDto } from './chat/chat.interface';
import { RegisterUserDto, LoginUserDto } from './auth/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service'; // Import AppService
import { User as PrismaUser } from '@prisma/client'; // Standard import for Prisma types

// Define an interface for the Express request object with a typed user property
interface AuthenticatedRequest extends Request {
  user: Omit<PrismaUser, 'password'>;
}

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
  sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @Request() req: AuthenticatedRequest,
  ) {
    // req.user is now typed
    const user = req.user;
    // No need for explicit check if user or user.id is missing if type guarantees it,
    // but good for runtime safety if payload could somehow be malformed despite guards.
    if (!user || !user.id) {
      throw new Error('User not authenticated or user ID missing');
    }
    const payload = {
      sendMessageDto,
      user: { id: user.id, email: user.email, name: user.name },
    };
    return this.chatServiceClient.send({ cmd: 'send_message' }, payload);
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
