# BuildCorp Admin Dashboard

The internal Content Management System (CMS) for the BuildCorp platform. This dashboard allows authorized users to manage website copy, create new project listings, and adjust site settings without writing code.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
- **Routing:** React Router DOM

## Folder Structure

```
admin/
├── public/               # Static assets for the admin interface
├── src/
│   ├── assets/           # Admin-specific images and SVGs
│   ├── pages/            # Dashboard Views
│   │   ├── AdminContent.jsx     # Visual editor to manage PageContent (CMS)
│   │   ├── AdminDashboard.jsx   # Overview and analytics home
│   │   ├── AdminLogin.jsx       # Authentication entry point
│   │   ├── AdminProjects.jsx    # Project portfolio list view
│   │   ├── AdminSettings.jsx    # Global site settings management
│   │   ├── ProjectForm.jsx      # Create/Edit form for individual projects
│   │   └── VisualEditor.jsx     # WYSIWYG or structured visual editing page
│   ├── services/         # API integration
│   │   └── api.js        # Axios instance configured with JWT interceptors
│   ├── App.jsx           # Routing logic and auth guards
│   ├── index.css         # Tailwind directives and admin global styles
│   └── main.jsx          # React DOM entry point
├── .env.example          # Template for environment variables (e.g. backend URL)
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
   The admin panel will be available at `http://localhost:5174`.

## Core Workflows
- **Content Management:** The `AdminContent.jsx` page interacts with the backend's `/api/content` route, allowing users to modify the text displayed in `EditableBlock` components on the frontend.
- **Security:** All authenticated routes require a valid JWT token, which is stored securely and attached to outbound requests via `src/services/api.js`.
