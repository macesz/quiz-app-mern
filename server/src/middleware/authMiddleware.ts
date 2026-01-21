import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { IUserDocument } from '../interfaces/IUser.js';



export interface AuthRequest extends Request {
    user?: IUserDocument;
}

export async function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {    
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access denied, no token provided." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { username: string };

        const user = await User.findOne({ username: decoded.username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        req.user = user;
        next()
    } catch (error: any) {
        console.error("Token verification error:", error.message);
        return res.status(401).json("Not authorized, token invalid.");
    }
}