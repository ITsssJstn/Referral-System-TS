import mongoose from 'mongoose';
import { RegisterDto, LoginDto } from '../dto/auth.Dto';
export declare class AuthService {
    private readonly JWT_SECRET;
    register(dto: RegisterDto): Promise<{
        user: {
            id: mongoose.Types.ObjectId;
            email: string;
            name: string;
            referralCode: string | undefined;
        };
        token: string;
    }>;
    getUserProfile(userId: string): Promise<{
        id: mongoose.Types.ObjectId;
        email: string;
        name: string;
        balance: number;
        referralCode: string | undefined;
        invitedUsers: mongoose.Types.ObjectId[];
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: mongoose.Types.ObjectId;
            email: string;
            name: string;
        };
        token: string;
    }>;
    getUserById(id: string): Promise<{
        id: mongoose.Types.ObjectId;
        email: string;
        name: string;
        referralCode: string | undefined;
    }>;
    private generateToken;
}
