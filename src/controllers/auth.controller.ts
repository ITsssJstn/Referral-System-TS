import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.Dto';
import { randomUUID } from 'crypto';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
      try {
          const registerData: RegisterDto = {
              email: req.body.email,
              password: req.body.password,
              name: req.body.name,
              referralCode: req.body.referralCode || undefined
          };
  
          const result = await this.authService.register(registerData);
          res.status(201).json(result);
      } catch (error) {
          console.error('Registration error:', error);
          res.status(400).json({ 
              error: error instanceof Error ? error.message : 'Ошибка при регистрации' 
          });
      }
  }
  

    async login(req: Request, res: Response) {
        try {
            const loginData: LoginDto = {
                email: req.body.email,
                password: req.body.password
            };

            const result = await this.authService.login(loginData);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ 
                error: error instanceof Error ? error.message : 'Ошибка аутентификации' 
            });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const userProfile = await this.authService.getUserProfile(userId);
            res.status(200).json(userProfile);
        } catch (error) {
            console.error('Error in getProfile:', error);
            res.status(400).json({ 
                error: error instanceof Error ? error.message : 'Ошибка получения профиля' 
            });
        }
    }
    

    async getReferralCode(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const user = await this.authService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            res.status(200).json({ referralCode: user.referralCode });
        } catch (error) {
            res.status(400).json({ 
                error: error instanceof Error ? error.message : 'Ошибка получения реферального кода' 
            });
        }
    }
}


