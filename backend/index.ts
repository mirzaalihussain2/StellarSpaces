// Global imports
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Local imports
import userRouter from './routes/userRouter';
import listingsRouter from './routes/listingsRouter';
import favouritesRouter from './routes/favouritesRouter';
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';
import { authRoutes } from './middleware/auth';
import imagesRouter from './routes/imagesRouter';
import stripeRoute from './routes/stripeRouter';
import chatRoute from './routes/chatRouter';
import messageRoute from './routes/messageRouter';
import passport from 'passport';
dotenv.config();

// Middlewares
const app: Express = express();
const port = Number(process.env.PORT);

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/auth', authRoutes());
app.use('/listings', listingsRouter);
app.use('/images', imagesRouter);
app.use('/favourites', favouritesRouter);
app.use('/stripe', stripeRoute);
app.use('/chats', chatRoute);
app.use('/message', messageRoute);

/*

http://localhost:3010/auth/google - initiates Google OAuth.
http://localhost:3010/auth/google/callback - callback for Google OAuth.

*/

app.use(errorHandlingMiddleware);

export default app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
app.listen(port, '127.0.0.1', () => {
  console.log(`Server is listening on http://localhost:${port}`);
});