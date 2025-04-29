import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/user.service";
import { RegisterInput, LoginInput } from "../schemas/user";

export const register = async (req: Request<{}, {}, RegisterInput['body']>, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;
        const { user, token } = await registerUser(email, password, name);

        res.status(201).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

export const login = async (req: Request<{}, {}, LoginInput['body']>, res: Response):Promise<void> => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);

        res.status(200).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};