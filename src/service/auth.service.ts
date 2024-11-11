import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserEntity } from '../entity/auth.Entity';
import { RegisterDto, LoginDto } from '../dto/auth.Dto'; // AuthDto AuthEntity
import { randomUUID } from 'crypto';

export class AuthService {
  private readonly JWT_SECRET = 'your-secret-key'; // Секретный ключ для JWT
  async register(dto: RegisterDto) {
    try {
        const existingUser = await UserEntity.findOne({ email: dto.email });
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const generatedReferralCode = randomUUID();
        let invitedBy = null;

        // Обработка реферальной системы
        if (dto.referralCode) {
            const referrer = await UserEntity.findOne({ referralCode: dto.referralCode });
            if (referrer) {
                invitedBy = referrer._id;

                // Создаем нового пользователя сначала
                const newUser = await UserEntity.create({
                    email: dto.email,
                    password: hashedPassword,
                    name: dto.name,
                    referralCode: generatedReferralCode,
                    invitedBy: referrer._id,
                    balance: 0,
                    invitedUsers: []
                });

                // Теперь обновляем реферера
                await UserEntity.findByIdAndUpdate(
                    referrer._id,
                    {
                        $inc: { balance: 500 },
                        $push: { invitedUsers: newUser._id } // Добавляем ID нового пользователя
                    },
                    { new: true }
                );

                return {
                    user: {
                        id: newUser._id,
                        email: newUser.email,
                        name: newUser.name,
                        referralCode: newUser.referralCode
                    },
                    token: this.generateToken(newUser._id.toString())
                };
            }
        }

        // Если нет реферального кода, просто создаем пользователя
        const user = await UserEntity.create({
            email: dto.email,
            password: hashedPassword,
            name: dto.name,
            referralCode: generatedReferralCode,
            invitedBy,
            balance: 0,
            invitedUsers: []
        });

        const token = this.generateToken(user._id.toString());

        return {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                referralCode: user.referralCode
            },
            token
        };
    } catch (error) {
        console.error('Service registration error:', error);
        throw error;
    }
}



async getUserProfile(userId: string) {
  try {
      // Используем populate для получения данных приглашенных пользователей
      const user = await UserEntity.findById(userId)
          .populate('invitedUsers', 'name email') // Получаем только нужные поля
          .exec();

      if (!user) {
          throw new Error('Пользователь не найден');
      }

      return {
          id: user._id,
          email: user.email,
          name: user.name,
          balance: user.balance || 0, // Если баланс undefined, возвращаем 0
          referralCode: user.referralCode,
          invitedUsers: user.invitedUsers || [] // Если нет приглашенных, возвращаем пустой массив
      };
  } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
  }
}


  async login(dto: LoginDto) {
    const user = await UserEntity.findOne({ email: dto.email });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new Error('Неверный пароль');
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async getUserById(id: string) {
    const user = await UserEntity.findById(id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      referralCode: user.referralCode, // Возвращаем реферальный код
    };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: '1h' }); // Генерация JWT токена на 1 час
  }
}