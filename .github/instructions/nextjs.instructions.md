---
applyTo: ["packages/marketing-website/**/*.tsx", "packages/admin-portal/**/*.tsx"]
---

## Next.js (Marketing & Admin) Development

- **Structure**: Use the `src/` directory and App Router.
- **TypeScript**: Enforce strict TypeScript usage. Define types for props, API responses, and state.
- **Styling**:
    - Use Tailwind CSS for styling.
    - Organize custom styles or overrides logically.
- **State Management**:
    - For client-side state, use React hooks (`useState`, `useReducer`, `useContext`).
    - For more complex state or server cache management, consider libraries like SWR, React Query, or Zustand.
- **Data Fetching**:
    - Utilize Next.js data fetching methods (Server Components, Route Handlers, `fetch` in Client Components).
    - Implement proper loading and error states for data fetching operations.
- **API Routes/Route Handlers**:
    - Define clear API contracts for Route Handlers.
    - Validate request bodies and parameters.
    - Handle errors gracefully and return consistent JSON responses.
- **Components**:
    - Build reusable components.
    - Follow a clear component hierarchy.
    - Use Server Components where possible for performance benefits.
- **ESLint**: Adhere to ESLint rules defined in `eslint.config.mjs`.
- **Import Alias**: Use `@/*` for imports from the `src/` directory.
- **Testing**:
    - Write unit tests for components and utility functions using Jest and React Testing Library.
    - Consider integration tests for page-level interactions.
    - E2E tests (e.g., using Playwright or Cypress) are recommended for critical user flows.
- **Environment Variables**: Use Next.js built-in support for environment variables.
- **Performance**:
    - Optimize images using `next/image`.
    - Leverage Next.js features like dynamic imports and code splitting.
- **Security**:
    - Be mindful of XSS, CSRF, and other web vulnerabilities.
    - Properly handle authentication and authorization, especially for the Admin Portal.
