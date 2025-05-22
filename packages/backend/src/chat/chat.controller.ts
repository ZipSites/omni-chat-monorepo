import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { SendMessageDto } from './chat.interface';
import { Message } from '../../generated/prisma'; // Import Prisma Message type

// Define a type for the user object expected from the JWT payload
interface AuthenticatedUser {
  id: string;
  email: string;
  // Add other fields if present in your JwtPayload and needed here
}

@Controller() // No path needed for microservice controllers that only use MessagePattern
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: 'send_message' })
  async sendMessage(
    @Payload() data: { sendMessageDto: SendMessageDto; user: AuthenticatedUser },
  ): Promise<Message> { // Return Prisma Message type
    console.log(
      'ChatController: Received send_message with payload:',
      data.sendMessageDto,
      'User:',
      data.user,
    );
    return this.chatService.sendMessage(data.sendMessageDto, data.user.id);
  }

  @MessagePattern({ cmd: 'get_messages_for_user' })
  async getMessagesForUser(
    @Payload() data: { userId: string },
  ): Promise<Message[]> { // Return array of Prisma Message type
    console.log(
      'ChatController: Received get_messages_for_user with payload:',
      data,
    );
    return this.chatService.getMessagesForUser(data.userId);
  }

  @MessagePattern({ cmd: 'get_all_chat_messages' })
  async getAllMessages(): Promise<Message[]> { // Return array of Prisma Message type
    console.log('ChatController: Received get_all_chat_messages');
    return this.chatService.getAllMessages();
  }
}
