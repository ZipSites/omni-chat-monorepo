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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_dto_1 = require("./auth/auth.dto");
const passport_1 = require("@nestjs/passport");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    userServiceClient;
    chatServiceClient;
    authServiceClient;
    constructor(appService, userServiceClient, chatServiceClient, authServiceClient) {
        this.appService = appService;
        this.userServiceClient = userServiceClient;
        this.chatServiceClient = chatServiceClient;
        this.authServiceClient = authServiceClient;
    }
    getHello() {
        return this.appService.getHello();
    }
    getUserById(id) {
        return this.userServiceClient.send({ cmd: 'get_user' }, { userId: id });
    }
    sendMessage(sendMessageDto, req) {
        const user = req.user;
        if (!user || !user.id) {
            throw new Error('User not authenticated or user ID missing');
        }
        const payload = {
            sendMessageDto,
            user: { id: user.id, email: user.email, name: user.name },
        };
        return this.chatServiceClient.send({ cmd: 'send_message' }, payload);
    }
    getMessagesForUser(userId) {
        return this.chatServiceClient.send({ cmd: 'get_messages_for_user' }, { userId });
    }
    getAllChatMessages() {
        return this.chatServiceClient.send({ cmd: 'get_all_chat_messages' }, {});
    }
    registerUser(registerUserDto) {
        return this.authServiceClient.send({ cmd: 'register_user' }, registerUserDto);
    }
    loginUser(loginUserDto) {
        return this.authServiceClient.send({ cmd: 'login_user' }, loginUserDto);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('chat/send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('chat/messages/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMessagesForUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('chat/messages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllChatMessages", null);
__decorate([
    (0, common_1.Post)('auth/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "loginUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('USER_SERVICE')),
    __param(2, (0, common_1.Inject)('CHAT_SERVICE')),
    __param(3, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppController);
//# sourceMappingURL=app.controller.js.map