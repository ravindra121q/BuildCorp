# BuildCorp Frontend

The public-facing client application for BuildCorp. This is an ultra-premium, "dark mode first" website designed to showcase high-end real estate and construction projects with a cinematic aesthetic.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (configured for deep obsidian dark mode)
- **Animations:** GSAP (ScrollTrigger) & Framer Motion
- **Scrolling:** Lenis (smooth scroll)
- **Routing:** React Router DOM

## Folder Structure

```
frontend/
├── public/               # Static assets like favicon, robots.txt, sitemap
├── src/
│   ├── assets/           # Images, SVGs, and brand assets
│   ├── components/       # Reusable React components
│   │   ├── layout/       # Navbar, Footer, MainLayout
│   │   └── ui/           # Buttons, Cards, AnimatedText, Sections, EditableBlock (CMS)
│   ├── pages/            # Page-level components (Home, About, Services, Projects, Contact)
│   ├── services/         # API integration logic (api.js to connect to the backend)
│   ├── tests/            # Unit tests for frontend logic
│   ├── App.jsx           # Main application routing and wrapper
│   ├── index.css         # Global CSS variables, fonts, and dark mode configuration
│   └── main.jsx          # React DOM entry point
├── doctor.config.json    # React Doctor accessibility & performance rules config
├── package.json          # Dependencies and npm scripts
└── vite.config.js        # Vite build configuration
```

## Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

3. **Build for production:**
   ```bash
   npm run build
   ```

## Key Features
- **EditableBlocks:** Text content across pages is wrapped in `EditableBlock` components. These fetch text dynamically from the backend API, allowing the content to be updated via the Admin panel without altering the codebase.
- **Cinematic Theme:** Driven by `index.css`, defaulting to dark obsidian backgrounds and glowing champagne accents.
