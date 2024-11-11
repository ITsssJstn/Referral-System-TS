import express from 'express';
import cors from 'cors';
import path from 'path';
import { AuthController } from './controllers/auth.controller';
import { authMiddleware } from './middleware/auth.middleware';

export const createApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Статические файлы
  app.use(express.static(path.join(__dirname, '../public')));

  const authController = new AuthController();

  // Routes
  app.post('/api/auth/register', (req, res) => authController.register(req, res));
  app.post('/api/auth/login', (req, res) => authController.login(req, res));
  app.get('/api/auth/profile', authMiddleware, (req, res) => authController.getProfile(req, res));

  // Корневой маршрут
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // Добавляем обработку GET-запроса для страницы регистрации
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html')); // Отправляем HTML-страницу регистрации
  });

  return app;
};