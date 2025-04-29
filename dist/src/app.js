import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes';
import { swaggerSpec } from '../config/swagger';
import swaggerUi from 'swagger-ui-express';
dotenv.config();
const app = express();
//Middlewares
app.use(express.json());
//Routes
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Error handling middleware
app.use(errorHandler);
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
export default app;
