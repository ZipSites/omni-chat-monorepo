import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { ChatMessage, SendMessageDto } from './chat.interface';

@Controller() // No path needed for microservice controllers that only use MessagePattern
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: 'send_message' })
  sendMessage(@Payload() data: SendMessageDto): ChatMessage {
    console.log('ChatController: Received send_message with payload:', data);
    return this.chatService.sendMessage(data);
  }

  @MessagePattern({ cmd: 'get_messages_for_user' })
  getMessagesForUser(@Payload() data: { userId: string }): ChatMessage[] {
    console.log(
      'ChatController: Received get_messages_for_user with payload:',
      data,
    );
    return this.chatService.getMessagesForUser(data.userId);
  }

  @MessagePattern({ cmd: 'get_all_chat_messages' })
  getAllMessages(): ChatMessage[] {
    console.log('ChatController: Received get_all_chat_messages');
    return this.chatService.getAllMessages();
  }
}
