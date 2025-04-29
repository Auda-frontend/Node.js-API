import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';

interface JwtPayload {
    userId: string;
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string, expiresIn: string): string => {
    if (!env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ userId } as JwtPayload, env.JWT_SECRET as jwt.Secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): { userId: string } => {
    if (!env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables ');
    }
    return jwt.verify(token, env.JWT_SECRET as jwt.Secret) as JwtPayload;
};