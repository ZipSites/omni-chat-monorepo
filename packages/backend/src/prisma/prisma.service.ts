import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma'; // Corrected import path

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  constructor() {
    super({
      // Optional: configure Prisma Client options here
      // log: ['query', 'info', 'warn', 'error'], // Example logging configuration
    });
  }

  async onModuleInit() {
    // Connect to the database when the module is initialized
    await this.$connect();
    console.log('Prisma Client connected to the database.');
  }

  async onApplicationShutdown(signal?: string) {
    // Disconnect from the database when the application is shutting down
    console.log(
      `Prisma Client disconnecting due to ${signal || 'application shutdown'}...`,
    );
    await this.$disconnect();
    console.log('Prisma Client disconnected.');
  }
}
