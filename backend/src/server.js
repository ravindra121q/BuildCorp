import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/adminRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import { setupSwagger } from './config/swagger.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Prevent helmet from blocking cross-origin images
})); 
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5000', 'http://localhost:5001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Explicit CORS configuration
app.use(express.json()); // Parse JSON body

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

// Setup Swagger Docs
setupSwagger(app);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BuildCorp API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
