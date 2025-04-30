import { sendEmail } from "../../../config/mailer.js";
import { User } from "@prisma/client";

export const sendWelcomeEmail = async (user: User) => {
    const subject = 'Welcome to Our Service';
    const text = `Hello ${user.name || 'there'},

    Thank you for registering with us.
    Your account has been successfully created.
    
    Get started by exploring our features.
    
    Best regards,
    Node.js API`;

    await sendEmail(user.email, subject, text);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const subject = 'Password Reset Request';
    const text = `We received a password reset request for your account.
    
    Use this token to reset your password: ${token}
    
    This token will expirre in 1 hour.
    
    If you didn't request this, please ignore this email.`;

    await sendEmail(email, subject, text);
};

