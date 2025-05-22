import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, LoginUserDto } from './auth.dto';
import { User } from '../../generated/prisma';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
        user: Omit<User, 'password'>;
    }>;
    validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null>;
    validateJwtPayload(payload: {
        sub: string;
        email: string;
    }): Promise<Omit<User, 'password'> | null>;
}
