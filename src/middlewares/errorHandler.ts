import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err.stack);

    if (process.env.NODE_ENV === 'production') {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: err.message,
            stack: err.stack
        });
    }
};