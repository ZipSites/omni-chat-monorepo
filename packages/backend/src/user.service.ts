import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(id: number): { id: number; name: string; email: string } {
    // In a real application, you would fetch this from a database
    console.log(`Fetching user with id: ${id} in UserService`);
    return { id, name: `User ${id}`, email: `user${id}@example.com` };
  }
}
