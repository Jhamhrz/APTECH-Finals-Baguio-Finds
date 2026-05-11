# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Technical Requirements

The app intentionally implements the following requirements:

1. React Fundamentals: Properly structured React application with component hierarchy, JSX, and logical props.
2. Components: UI is broken into reusable functional components with clear, distinct responsibilities.
3. State & State Management: Product filtering is driven by React state using `useState`, and the UI updates responsively.
4. Event Handling: User interactions are handled through React event handlers. The app uses filter button clicks and product card navigation.
5. Routing: Multiple views are implemented with React Router v6, including a dynamic product detail route.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
