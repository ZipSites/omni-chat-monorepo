<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a monorepo for the Omni-Chat application, built using Lerna and Yarn Workspaces. The project consists of the following packages:

- **`packages/backend`**: A NestJS application serving as the backend with a microservices architecture.
- **`packages/embeddable-ui`**: A Preact frontend application for the embeddable chat UI.
- **`packages/marketing-website`**: A Next.js application for the marketing website.
- **`packages/admin-portal`**: A Next.js application for the admin portal.

Refer to specific instruction files in `.github/instructions/` for detailed guidance on each package.

## Development Status

- Monorepo structure initialized with Lerna.
- Yarn Workspaces configured.
- Initial scaffolding for all packages (`backend`, `embeddable-ui`, `marketing-website`, `admin-portal`) is complete.
- Root `package.json` includes scripts for managing the monorepo (e.g., `bootstrap`, `dev`, `build`).
- A VS Code task "Run All Applications (Development)" is configured in `.vscode/tasks.json` to start all services.
- Git initialized for version control.
- Granular Copilot instruction files created in `.github/instructions/`.
- VS Code workspace settings (`.vscode/settings.json`) configured for Copilot test generation and commit message conventions.

## Core Technologies

- **Monorepo Management**: Lerna, Yarn Workspaces
- **Primary Language**: TypeScript
- **Package Manager**: npm (for individual packages, Lerna manages the monorepo)
- **Version Control**: Git
- **Remote Repository Management**: GitHub ( предполагается использование `gh` CLI)
- **Linting**: ESLint (package-specific configurations)
- **Testing**: Jest (primary, with React Testing Library/Preact Testing Library as appropriate)

## General Coding Style and Conventions

- **Modularity**: Maintain a modular codebase. Break down complex functionalities into smaller, manageable units.
- **Documentation**: Write clear and concise comments for complex logic, public APIs, and non-obvious code sections.
- **TypeScript Best Practices**:
    - Strive for strong typing. Avoid `any` where possible.
    - Use utility types (e.g., `Partial`, `Readonly`) effectively.
    - Prefer `ESM` module syntax (`import`/`export`).
- **Error Handling**: Implement robust error handling. Provide meaningful error messages.
- **Readability**: Prioritize code readability and maintainability.
- **Configuration**: Avoid hardcoding sensitive information or environment-specific values. Use environment variables or configuration files.
- **Commit Messages**: Follow conventional commit guidelines as specified in `.vscode/settings.json`.
- **Testing**: Adhere to testing guidelines specified in `.vscode/settings.json` and package-specific instruction files.

## Next Steps / To-Do

- Configure NestJS backend for microservices architecture (see `backend.instructions.md`).
- Develop UI components for the Preact embeddable chat (see `preact.instructions.md`).
- Create pages and content for the Next.js marketing website (see `nextjs.instructions.md`).
- Build out features for the Next.js admin portal (see `nextjs.instructions.md`).
- Implement API integrations between frontend applications and the backend.
- Set up shared libraries or utilities within the monorepo if needed.
- Configure CI/CD pipelines.
- Set up remote GitHub repository and push initial project structure.

## Things to Avoid

- Introducing overly complex state management solutions without strong justification.
- Writing code that is difficult to test.
- Ignoring linting or type errors.
- Committing large, uncommented, or poorly understood blocks of code.
