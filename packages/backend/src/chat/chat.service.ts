import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './chat.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '../../generated/prisma';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    sendMessageDto: SendMessageDto,
    authorId: string,
  ): Promise<Message> {
    const newMessage = await this.prisma.message.create({
      data: {
        text: sendMessageDto.text,
        authorId: authorId,
      },
    });
    console.log('ChatService: Message sent:', newMessage);
    return newMessage;
  }

  async getMessagesForUser(userId: string): Promise<Message[]> {
    console.log(`ChatService: Getting messages for user: ${userId}`);
    return await this.prisma.message.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getAllMessages(): Promise<Message[]> {
    return await this.prisma.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
