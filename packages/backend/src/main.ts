import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // User Service Microservice
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8001, // Port for the User microservice
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
    { inheritAppConfig: true }, // Important for hybrid apps to share config, pipes, etc.
  );

  // Chat Service Microservice
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8002, // Port for the Chat microservice
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
    { inheritAppConfig: true }, // Important for hybrid apps to share config, pipes, etc.
  );

  // Auth Service Microservice
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8003, // Port for the Auth microservice
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
    { inheritAppConfig: true }, // Important for hybrid apps to share config, pipes, etc.
  );

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`User Microservice is listening on port 8001`);
  console.log(`Chat Microservice is listening on port 8002`);
  console.log(`Auth Microservice is listening on port 8003`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap the application', err);
  process.exit(1);
});
