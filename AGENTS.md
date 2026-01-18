# AGENTS.md - Guidelines for AI Coding Agents

This document provides guidelines for AI agents working on the cv-website project.

## Project Overview

A personal CV/portfolio website built with React + Tailwind CSS featuring a "hacker/tech" theme (01010101 aesthetic). The site displays professional experience, skills, projects, and certifications.

## Commands

### Development
```bash
npm run dev          # Start dev server (default port 5173)
npm run dev -- --port 3000  # Custom port
```

### Build & Deploy
```bash
npm run build        # Build for production (outputs to /dist)
npm run preview      # Preview production build locally
npm run deploy       # Build + deploy to GitHub Pages (gh-pages branch)
```

### Linting
```bash
npm run lint         # Run ESLint on entire project
```

## Code Style Guidelines

### General Principles
- Write clean, self-documenting code
- Prefer composition over complexity
- Keep components small and focused
- Use functional components with hooks

### React Component Structure
```jsx
// 1. Imports (alphabetical, grouped by type)
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import cvData from './data/cv.json';

// 2. Component definition (no parentheses for arrow functions)
const ComponentName = ({ data }) => {
  // 3. Hooks (useState, useEffect, etc.)
  const [state, setState] = useState(false);

  // 4. Derived state (computed from props/state)
  const items = data.filter(x => x.active);

  // 5. Event handlers
  const handleClick = () => { /* ... */ };

  // 6. Render
  return <div>{/* JSX */}</div>;
};

export default ComponentName;
```

### Imports
- Alphabetical order within groups
- React imports first, then third-party, then local
- Named imports for React hooks, default for components

```jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import cvData from './data/cv.json';
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `const Experience = () => {}` |
| Files | PascalCase for components, camelCase for utilities | `Experience.jsx`, `useData.js` |
| Hooks | camelCase starting with "use" | `useLocalStorage`, `useScroll` |
| CSS Classes | kebab-case | `.section-title`, `.tech-tag` |
| CSS Variables | kebab-case with `--` prefix | `--color-hacker-green` |
| Props | camelCase | `data`, `onClick`, `isVisible` |
| Constants | UPPER_SNAKE_CASE | `const MAX_ITEMS = 10;` |

### CSS & Tailwind
- Use Tailwind utility classes for styling
- Custom theme variables defined in `@theme` block (Tailwind v4)
- CSS custom properties for repeated values
- Keep CSS file structure organized by @layer (base, components, utilities)
- Use semantic class names matching component structure

```css
@theme {
  --color-hacker-green: #00ff41;
  --font-mono: 'Fira Code', monospace;
}

/* Component classes grouped together */
.card { /* ... */ }
.card:hover { /* ... */ }
```

### Event Handling
- Use arrow functions for event handlers
- Name handlers with `handle` prefix: `handleSubmit`, `handleChange`
- Pass event handlers as `on` props: `onClick`, `onChange`
- Use `e.stopPropagation()` when needed to prevent bubbling

```jsx
const handleClick = (e) => {
  e.stopPropagation();
  onItemSelect(id);
};

<button onClick={handleClick}>Click</button>
```

### State Management
- Use `useState` for local component state
- Use `useEffect` for side effects (data fetching, subscriptions)
- Use `useRef` for mutable refs that don't trigger re-renders
- Avoid unnecessary state derivations - compute from props/state

### JSON Data (cv.json)
- Content stored in `src/data/cv.json`
- Follow existing structure: profile, hero, about, experience, skills, projects, education, contact
- Avoid hardcoding content in components
- All display text should come from cv.json

### Error Handling
- No empty catch blocks: `catch (e) { console.error(e); }`
- Handle loading/error states for async operations
- Provide user feedback for failed actions

### Conditionals
- Use ternary operators for simple conditional JSX
- Use && for conditional rendering (not ternary with null)
- Extract complex conditions to named variables

```jsx
{isVisible && <Component />}
{expanded ? <ExpandedView /> : <SummaryView />}
{items.length > 0 && items.map(item => <Item key={item.id} />)}
```

### Keyframes & Animations
- Define animations in CSS file (not inline)
- Use descriptive names: `blink`, `scanline`, `float`, `glitch-skew`
- Apply via CSS classes or style props

### File Organization
```
src/
├── components/     # React components (one per file)
├── data/           # JSON data files
├── assets/         # Static assets (images, etc.)
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles & Tailwind
public/
├── favicon.svg     # Browser tab icon
└── profile.jpg     # Profile photo
```

### Accessibility
- Use semantic HTML elements (`<section>`, `<nav>`, `<main>`)
- Include `alt` text for images
- Use `aria-label` for icon-only buttons
- Ensure keyboard navigation works

## Git Workflow

1. Make changes in feature branch or main
2. Run `npm run lint` before committing
3. Run `npm run build` to verify production build
4. Commit with descriptive message
5. Push and create PR if using branches

## Common Tasks

### Add New Section
1. Create component in `src/components/SectionName.jsx`
2. Add data structure to `src/data/cv.json`
3. Import and use component in `src/App.jsx`

### Add New Skill Category
1. Edit `src/data/cv.json` → `skills.categories`
2. Component handles rendering automatically

### Update Profile Info
1. Edit `src/data/cv.json` → `profile` section
2. Changes reflect across all components

## Deployment

- Deploy via `npm run deploy` (pushes to `gh-pages` branch)
- Site URL: `https://cyrustse.github.io/cv-website/`
- Configure base path in `vite.config.js` if changing repo name
