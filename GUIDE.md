# Rick & Morty Modernization Blueprint (AI System Instructions)

> This document is designed for AI models and senior developers to maintain or recreate the modernized architecture of the Rick and Morty React project.

## 1. Project Context
- **Framework**: React 19 (Strict Mode)
- **State Management**: Zustand 5+ (Modular stores with persistence)
- **Styling**: Tailwind CSS v4 (No legacy CSS files)
- **Build Tool**: Vite 6+
- **Typing**: Strict TypeScript + ESLint Naming Conventions

## 2. Mandatory Coding Standards (Strict Rules)

### A. Naming Conventions
- **Interfaces**: Must start with `I` (e.g., `ICharacter`, `IServiceResponse`).
- **Types**: Must start with `T` (e.g., `TStatus`, `TTheme`).
- **Files**: PascalCase for components (`CharacterCard.tsx`), camelCase for hooks and stores (`useCharacterStore.ts`).

### B. Typing Rules
- **No `any`**: Strictly forbidden. Use `unknown` with type guards or proper interfaces.
- **Exporting**: All interfaces must be centralized in `@/interfaces`.
- **Exhaustive Types**: Use unions for finite states (e.g., `status: 'Alive' | 'Dead' | 'unknown'`).

### C. Styling (Tailwind v4)
- **Zero CSS Policy**: No component-specific `.css` files.
- **index.css**: The only CSS file allowed. Contains theme tokens and global glassmorphism definitions.
- **Glassmorphism**: Always use the `.glass-card` utility for containers.

## 3. Architecture & File Structure

```text
src/
├── components/
│   ├── ui/           # Generic atoms (GlassCard, Layout)
│   ├── navbar/       # Navigation components
│   └── character/    # Feature-specific components (List, Card, Filters)
├── interfaces/       # Centrally typed models (I-prefix)
├── lib/              # Utilities (cn, tailwind-merge)
├── store/            # Zustand stores (Modular & Persisted)
├── pages/            # Page-level components
└── routes/           # createBrowserRouter configuration
```

## 4. State Management Logic (Zustand)
Always follow this pattern for stores:
- Use `persist` for favorites or user preferences.
- Include `loading` and `error` states.
- Separation of concerns: Fetching logic lives inside the store actions.

```typescript
// Example Pattern
export const useFeatureStore = create<IFeatureState>()(
  persist((set, get) => ({ 
    items: [], 
    fetch: async () => { /* logic */ } 
  }), { name: 'storage-key' })
);
```

## 5. UI/UX Principles
- **Minimalism**: High white space, clean typography (Inter).
- **Glassmorphism**: `backdrop-blur-md`, `border-white/20`, `bg-white/70`.
- **Animations**: Use `framer-motion` for list entries and hover effects (`whileHover={{ y: -5 }}`).
- **Responsive**: Grid systems must always be defined for `sm`, `lg`, and `xl` breakpoints.

## 6. Build & Quality Pipeline
- **Linting**: `npm run lint` (ESLint 9+ with naming-convention rules).
- **TypeScript**: `tsconfig.json` using `moduleResolution: Bundler`.
- **PostCSS**: Not needed if using `@tailwindcss/vite`. Remove redundant `postcss.config.js`.

---
*Blueprint Version: 2.0.0*
*Last Updated: 2026-03-08*
