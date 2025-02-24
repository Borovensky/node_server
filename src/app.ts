import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';
import { connectDB } from './config/db';
import userRoutes from './modules/user/user.routes';

dotenv.config();

const app: Application = express();

// connect DB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Integrate Swagger: Serve API docs at the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes
app.use('/api/v1/user', userRoutes);

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
