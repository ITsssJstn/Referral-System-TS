import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    referralCode?: string;
    invitedBy?: mongoose.Types.ObjectId | null;
    balance?: number;
    invitedUsers?: mongoose.Types.ObjectId[];
}
export declare const UserEntity: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>;
