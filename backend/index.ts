import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

export default app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
