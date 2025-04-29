import express from 'express';
import { register, login } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../schemas/user';
const router = express.Router();
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
export default router;
