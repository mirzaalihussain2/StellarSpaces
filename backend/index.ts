import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(errorHandlingMiddleware);

export default app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
