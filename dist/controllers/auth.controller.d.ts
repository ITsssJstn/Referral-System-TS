import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor();
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    getProfile(req: Request, res: Response): Promise<void>;
    getReferralCode(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
