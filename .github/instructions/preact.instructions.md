---
applyTo: "packages/embeddable-ui/**/*.tsx"
---

## Preact Embeddable UI Development

- **Component Structure**: Create functional components using Preact.
- **State Management**:
    - For simple component-level state, use Preact's built-in `useState` and `useReducer` hooks.
    - For more complex global or shared state, consider using Preact Signals (`@preact/signals`) or a lightweight state management library suitable for Preact. Avoid overly complex solutions for an embeddable UI.
- **Styling**:
    - Use CSS Modules or a CSS-in-JS solution that is lightweight and performs well (e.g., `otion`, `goober`).
    - Ensure styles are scoped to avoid conflicts when embedded in other websites.
- **Performance**:
    - Keep the bundle size small, as this UI will be embedded.
    - Optimize component rendering and avoid unnecessary re-renders.
    - Lazy load components or features where appropriate.
- **TypeScript**:
    - Use TypeScript for all components and logic.
    - Define props interfaces clearly.
- **Testing**:
    - Write unit tests for components using a library like Preact Testing Library.
    - Test component interactions and state changes.
- **Build Tool**: Utilize Vite for development and building the Preact application.
- **Embedding Considerations**:
    - Design the UI to be easily configurable and themeable via props or a configuration object.
    - Minimize external dependencies.
    - Ensure the UI is responsive and adapts to different container sizes.
- **Code Style**:
    - Maintain a clean and readable codebase.
    - Comment complex components or logic.
