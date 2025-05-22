import { ChatService } from './chat.service';
import { SendMessageDto } from './chat.interface';
import { Message } from '../../generated/prisma';
interface AuthenticatedUser {
    id: string;
    email: string;
}
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(data: {
        sendMessageDto: SendMessageDto;
        user: AuthenticatedUser;
    }): Promise<Message>;
    getMessagesForUser(data: {
        userId: string;
    }): Promise<Message[]>;
    getAllMessages(): Promise<Message[]>;
}
export {};
