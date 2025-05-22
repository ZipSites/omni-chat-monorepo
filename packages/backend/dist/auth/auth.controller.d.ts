import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './auth.dto';
import { User } from '../../generated/prisma';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
        user: Omit<User, 'password'>;
    }>;
}
