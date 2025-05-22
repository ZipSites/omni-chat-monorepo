import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // This path is now correct

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
