import { ZodError } from "zod";
export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ status: 'fail', errors: error.errors, });
            return;
        }
        next(error);
    }
};
