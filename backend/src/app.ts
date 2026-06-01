import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from '@/routes';

const app = express();

// Config Cors
app.use(cors({
  origin: '*', // For development, allow all. In production, specify frontend URL.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root check
app.get('/', (req, res) => {
  res.send('CaféStoll Backend API');
});

// Attach api routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro interno do servidor:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;
