import { OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
    constructor();
    onModuleInit(): Promise<void>;
    onApplicationShutdown(signal?: string): Promise<void>;
}
