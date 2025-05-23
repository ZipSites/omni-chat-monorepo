"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerUserDto) {
        const { email, password, name } = registerUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        const { password: _omittedPassword, ...result } = user;
        return result;
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials (user not found)');
        }
        if (typeof user.password !== 'string') {
            throw new common_1.UnauthorizedException('Invalid user data (password not set)');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Invalid credentials (password mismatch)');
        }
        const payload = { email: user.email, sub: user.id, name: user.name };
        const accessToken = this.jwtService.sign(payload);
        const { password: _omittedPassword, ...userResult } = user;
        return {
            accessToken,
            user: userResult,
        };
    }
    async validateUser(email, pass) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (user && typeof user.password === 'string') {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }
    async validateJwtPayload(payload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });
        if (user && user.email === payload.email) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map