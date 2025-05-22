import { ClientProxy } from '@nestjs/microservices';
import { SendMessageDto } from './chat/chat.interface';
import { RegisterUserDto, LoginUserDto } from './auth/auth.dto';
import { AppService } from './app.service';
import { User as PrismaUser } from '@prisma/client';
interface AuthenticatedRequest extends Request {
    user: Omit<PrismaUser, 'password'>;
}
export declare class AppController {
    private readonly appService;
    private readonly userServiceClient;
    private readonly chatServiceClient;
    private readonly authServiceClient;
    [x: string]: any;
    constructor(appService: AppService, userServiceClient: ClientProxy, chatServiceClient: ClientProxy, authServiceClient: ClientProxy);
    getHello(): string;
    getUserById(id: string): import("rxjs").Observable<any>;
    sendMessage(sendMessageDto: SendMessageDto, req: AuthenticatedRequest): import("rxjs").Observable<any>;
    getMessagesForUser(userId: string): import("rxjs").Observable<any>;
    getAllChatMessages(): import("rxjs").Observable<any>;
    registerUser(registerUserDto: RegisterUserDto): import("rxjs").Observable<any>;
    loginUser(loginUserDto: LoginUserDto): import("rxjs").Observable<any>;
}
export {};
