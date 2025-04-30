import nodemailer from 'nodemailer';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: false,
    auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
): Promise<void> => {
    await transporter.sendMail({
        from: env.EMAIL_FROM,
        to,
        subject,
        html,
    });
};