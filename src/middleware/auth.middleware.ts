// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const decoded = jwt.verify(token, 'your-secret-key');// зачекай отправления jwt token
    req.body = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
};