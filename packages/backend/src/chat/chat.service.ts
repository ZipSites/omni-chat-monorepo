import { Injectable } from '@nestjs/common';
import { ChatMessage, SendMessageDto } from './chat.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  private readonly messages: ChatMessage[] = []; // In-memory store for messages

  sendMessage(sendMessageDto: SendMessageDto): ChatMessage {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      ...sendMessageDto,
      timestamp: new Date(),
    };
    this.messages.push(newMessage);
    console.log('ChatService: Message sent:', newMessage);
    // Here you would typically also emit an event to the receiver
    // For simplicity, we'll just return the message for now.
    return newMessage;
  }

  getMessagesForUser(userId: string): ChatMessage[] {
    console.log(`ChatService: Getting messages for user: ${userId}`);
    return this.messages.filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId,
    );
  }

  // Basic example of getting all messages - you'd want more sophisticated retrieval in a real app
  getAllMessages(): ChatMessage[] {
    return this.messages;
  }
}
