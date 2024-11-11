"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    async register(req, res) {
        try {
            const registerData = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                referralCode: req.body.referralCode || undefined
            };
            const result = await this.authService.register(registerData);
            res.status(201).json(result);
        }
        catch (error) {
            console.error('Registration error:', error);
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Ошибка при регистрации'
            });
        }
    }
    async login(req, res) {
        try {
            const loginData = {
                email: req.body.email,
                password: req.body.password
            };
            const result = await this.authService.login(loginData);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(401).json({
                error: error instanceof Error ? error.message : 'Ошибка аутентификации'
            });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.body.userId;
            const userProfile = await this.authService.getUserProfile(userId);
            res.status(200).json(userProfile);
        }
        catch (error) {
            console.error('Error in getProfile:', error);
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Ошибка получения профиля'
            });
        }
    }
    async getReferralCode(req, res) {
        try {
            const userId = req.body.userId;
            const user = await this.authService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            res.status(200).json({ referralCode: user.referralCode });
        }
        catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Ошибка получения реферального кода'
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map