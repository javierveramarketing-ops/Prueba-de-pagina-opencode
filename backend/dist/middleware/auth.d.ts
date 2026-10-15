import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        nivel: string;
        esAdmin: boolean;
    };
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function generateToken(user: {
    id: string;
    email: string;
    nivel: string;
    esAdmin: boolean;
}): string;
//# sourceMappingURL=auth.d.ts.map