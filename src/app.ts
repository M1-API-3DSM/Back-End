// src/app.ts
import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware
app.use(express.json());;

// Routes
app.use('/task', taskRoutes);

export default app;