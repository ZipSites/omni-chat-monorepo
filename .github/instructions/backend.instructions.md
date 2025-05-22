---
applyTo: "packages/backend/**/*.ts"
---

## NestJS Backend Development

- **Architecture**: Follow microservices principles. Clearly define service boundaries and communication protocols (e.g., gRPC, Kafka, or NATS).
- **Modules**: Organize code into NestJS modules. Each feature or domain should have its own module.
- **Services**: Business logic should reside in services. Controllers should be lean and delegate tasks to services.
- **DTOs (Data Transfer Objects)**: Use DTOs for request and response payloads. Validate DTOs using `class-validator` and `class-transformer`.
- **Error Handling**: Implement consistent error handling. Use NestJS built-in exceptions or custom exception filters.
- **Database**: When interacting with databases (e.g., via TypeORM or Prisma), ensure services abstract away the specific ORM/query builder logic.
- **Testing**:
    - Write unit tests for services, controllers, and other individual components using Jest.
    - Aim for high test coverage for business logic.
    - Mock dependencies appropriately.
    - Include integration tests for module interactions and e2e tests for API endpoints.
- **Async/Await**: Use `async/await` for all asynchronous operations.
- **Logging**: Implement structured logging (e.g., using Winston or Pino) for better observability.
- **Configuration**: Manage configuration using the `@nestjs/config` module. Avoid hardcoding sensitive information.
- **Security**: Be mindful of security best practices (e.g., input validation, authentication, authorization).
- **Code Style**:
    - Adhere to ESLint rules defined in `eslint.config.mjs`.
    - Prefer interfaces over types for public APIs within modules.
    - Ensure all public methods and complex logic are well-commented.
