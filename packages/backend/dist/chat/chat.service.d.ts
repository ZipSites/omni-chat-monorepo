import { SendMessageDto } from './chat.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '../../generated/prisma';
export declare class ChatService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    sendMessage(sendMessageDto: SendMessageDto, authorId: string): Promise<Message>;
    getMessagesForUser(userId: string): Promise<Message[]>;
    getAllMessages(): Promise<Message[]>;
}
