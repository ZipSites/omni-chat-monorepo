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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(data) {
        console.log('ChatController: Received send_message with payload:', data.sendMessageDto, 'User:', data.user);
        return this.chatService.sendMessage(data.sendMessageDto, data.user.id);
    }
    async getMessagesForUser(data) {
        console.log('ChatController: Received get_messages_for_user with payload:', data);
        return this.chatService.getMessagesForUser(data.userId);
    }
    async getAllMessages() {
        console.log('ChatController: Received get_all_chat_messages');
        return this.chatService.getAllMessages();
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'send_message' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_messages_for_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessagesForUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_chat_messages' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllMessages", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map