# VSCode Screenshot Plugin Landing Page

A modern, tech-focused landing page for a VSCode screenshot extension built with Vue 3, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Vue 3.4+ with Composition API
- **Language**: TypeScript 5.2+ (strict mode)
- **Build Tool**: Vite 4.5+
- **Routing**: Vue Router 4.0+
- **State Management**: Pinia 2.0+
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Heroicons 2.0+

## Project Structure

```
src/
├── assets/
│   └── styles/
│       └── main.css          # Tailwind imports and custom styles
├── components/
│   ├── layout/               # Layout components (NavBar, Footer)
│   ├── sections/             # Page sections (Hero, Features, Demo)
│   ├── ui/                   # Reusable UI components
│   └── icons/                # Icon components
├── stores/                   # Pinia stores
├── router/                   # Vue Router configuration
├── types/                    # TypeScript interfaces
├── views/                    # Page views
├── App.vue                   # Root component
└── main.ts                   # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 10.x or higher

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or another port if 5173 is in use).

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Features

- ✅ Dark/Light theme support with system preference detection
- ✅ Responsive design (mobile-first)
- ✅ TypeScript strict mode
- ✅ Tailwind CSS with custom theme
- ✅ Google Fonts (Space Grotesk & DM Sans)
- ✅ Accessibility features (reduced motion support)
- ✅ Glass morphism effects
- ✅ Smooth scrolling

## Configuration

### Tailwind CSS

The Tailwind configuration includes:
- Dark mode support (class strategy)
- Custom color palette
- Custom font families
- Extended theme with project-specific colors

### TypeScript

TypeScript is configured with:
- Strict mode enabled
- Path aliases (`@/` → `src/`)
- Vue 3 support

## Next Steps

Follow the implementation tasks in `.kiro/specs/vscode-screenshot-plugin-landing/tasks.md` to build out the landing page components.
