import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken, comparePasswords } from "../utils/auth";
import { env } from "../../config/env";
const prisma = new PrismaClient();
export const registerUser = async (email, password, name) => {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    const token = generateToken(user.id, env.JWT_EXPIRES_IN);
    return { user, token };
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(user.id, env.JWT_EXPIRES_IN);
    return { user, token };
};
