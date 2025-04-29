import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js'; 
import router from './routes/index.js';
import { swaggerSpec } from '../config/swagger.js';
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