import { registerUser, loginUser } from "../services/user.service";
export const register = async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
export const login = async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
