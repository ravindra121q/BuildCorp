# BuildCorp Backend API

The RESTful API serving the BuildCorp platform. This handles data persistence, user authentication, content management for the CMS, and project portfolio data.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer & Cloudinary (optional configuration)

## Folder Structure

```
backend/
├── scripts/              # Utility scripts (e.g., seed.js for database population)
├── src/
│   ├── config/           # Configuration files
│   │   ├── cloudinary.js # Cloudinary upload configuration
│   │   ├── db.js         # MongoDB connection logic
│   │   └── swagger.js    # Swagger UI documentation config
│   ├── controllers/      # Business logic handlers for routes
│   │   ├── adminController.js   # Admin auth and management
│   │   ├── contentController.js # Page content CRUD operations
│   │   └── projectController.js # Portfolio projects CRUD operations
│   ├── middleware/       # Express middleware (e.g., file upload handlers)
│   ├── models/           # Mongoose schemas and models
│   │   ├── Contact.js    # Contact form submissions
│   │   ├── PageContent.js# Dynamic CMS content fields
│   │   ├── Project.js    # Real estate/construction projects
│   │   ├── Service.js    # Service offerings
│   │   └── User.js       # Admin user accounts
│   ├── routes/           # API route definitions mapping to controllers
│   │   ├── adminRoutes.js
│   │   ├── contact.js
│   │   ├── contentRoutes.js
│   │   └── projectRoutes.js
│   ├── tests/            # API integration tests
│   ├── auth.js           # JWT authentication middleware
│   └── server.js         # Express app initialization and server entry point
├── .env.example          # Template for environment variables
└── package.json          # Dependencies and npm scripts
```

## Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file based on `.env.example`. You will need a `MONGO_URI` and a `JWT_SECRET`.

3. **Start the server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5001`.

## Documentation
Swagger API documentation is automatically generated and can be accessed at `http://localhost:5001/api-docs` when the server is running.
