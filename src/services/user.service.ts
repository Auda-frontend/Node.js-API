import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken, comparePasswords } from "../utils/auth.js";
import { env } from "../../config/env.js";
import { sendWelcomeEmail } from "./email/email.service.js";

const prisma = new PrismaClient();

export const registerUser = async (
    email: string,
    password: string,
    name?: string
) => {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    const token = generateToken(user.id, env.JWT_EXPIRES_IN);

    //Welcome email
    try {
        await sendWelcomeEmail(user);
    } catch (emailError) {
        console.log('Failed to send welcome email:', emailError);
    }

    return { user, token };
};

export const loginUser = async (email: string, password: string) => {
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