export interface ChatMessage {
  id: string;
  text: string;
  authorId: string;
  createdAt: Date;
}

export interface SendMessageDto {
  text: string;
  // senderId will be derived from the authenticated user
}
