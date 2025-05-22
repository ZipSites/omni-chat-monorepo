"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 8001,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    }, { inheritAppConfig: true });
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 8002,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    }, { inheritAppConfig: true });
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 8003,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    }, { inheritAppConfig: true });
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
//# sourceMappingURL=main.js.map