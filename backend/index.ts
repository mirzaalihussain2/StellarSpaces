// Global imports
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Local imports
import userRouter from './routes/userRouter';
// import listingsRouter from './routes/listingsRouter';
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';

dotenv.config();

// Middlewares
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
// app.use('/listings', listingsRouter);

app.use(errorHandlingMiddleware);

export default app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
