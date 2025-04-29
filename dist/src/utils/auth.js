import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../../config/env';
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
export const generateToken = (userId, expiresIn) => {
    if (!env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn });
};
export const verifyToken = (token) => {
    if (!env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables ');
    }
    return jwt.verify(token, env.JWT_SECRET);
};
