import { ObjectId } from 'mongoose';
export interface RegisterDto {
    email: string;
    password: string;
    name: string;
    referralCode?: string;
}
export interface UserResponseDto {
    id: ObjectId;
    email: string;
    name: string;
    referralCode: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface UserResponseDto {
    _id: string | ObjectId;
    email: string;
    name: string;
    referralCode: string;
    balance: number;
    invitedUsers: Array<{
        id: string | ObjectId;
        name: string;
        email: string;
    }>;
}
