"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_Entity_1 = require("../entity/auth.Entity");
const crypto_1 = require("crypto");
class AuthService {
    constructor() {
        this.JWT_SECRET = 'your-secret-key'; // Секретный ключ для JWT
    }
    async register(dto) {
        try {
            const existingUser = await auth_Entity_1.UserEntity.findOne({ email: dto.email });
            if (existingUser) {
                throw new Error('Пользователь с таким email уже существует');
            }
            const hashedPassword = await bcrypt_1.default.hash(dto.password, 10);
            const generatedReferralCode = (0, crypto_1.randomUUID)();
            let invitedBy = null;
            // Обработка реферальной системы
            if (dto.referralCode) {
                const referrer = await auth_Entity_1.UserEntity.findOne({ referralCode: dto.referralCode });
                if (referrer) {
                    invitedBy = referrer._id;
                    // Создаем нового пользователя сначала
                    const newUser = await auth_Entity_1.UserEntity.create({
                        email: dto.email,
                        password: hashedPassword,
                        name: dto.name,
                        referralCode: generatedReferralCode,
                        invitedBy: referrer._id,
                        balance: 0,
                        invitedUsers: []
                    });
                    // Теперь обновляем реферера
                    await auth_Entity_1.UserEntity.findByIdAndUpdate(referrer._id, {
                        $inc: { balance: 500 },
                        $push: { invitedUsers: newUser._id } // Добавляем ID нового пользователя
                    }, { new: true });
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
            const user = await auth_Entity_1.UserEntity.create({
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
        }
        catch (error) {
            console.error('Service registration error:', error);
            throw error;
        }
    }
    async getUserProfile(userId) {
        try {
            // Используем populate для получения данных приглашенных пользователей
            const user = await auth_Entity_1.UserEntity.findById(userId)
                .populate('invitedUsers', 'name email') // Получаем только нужные поля
                .exec();
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            return {
                id: user._id,
                email: user.email,
                name: user.name,
                balance: user.balance || 0,
                referralCode: user.referralCode,
                invitedUsers: user.invitedUsers || [] // Если нет приглашенных, возвращаем пустой массив
            };
        }
        catch (error) {
            console.error('Error getting user profile:', error);
            throw error;
        }
    }
    async login(dto) {
        const user = await auth_Entity_1.UserEntity.findOne({ email: dto.email });
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const isValidPassword = await bcrypt_1.default.compare(dto.password, user.password);
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
    async getUserById(id) {
        const user = await auth_Entity_1.UserEntity.findById(id);
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
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, this.JWT_SECRET, { expiresIn: '1h' }); // Генерация JWT токена на 1 час
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map