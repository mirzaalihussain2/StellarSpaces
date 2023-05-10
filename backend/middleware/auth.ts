import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import {
  getUserByEmail,
  createUserFromGoogleProfile,
  getUserById,
  loginUser,
} from '../models/userModel';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request, Response, NextFunction, Router } from 'express';
import { GoogleProfile } from '../interfaces/GoogleProfile';

interface User {
  id: string;
  email: string;
}

async function findOrCreateUser(profile: GoogleProfile) {
  let user = await getUserByEmail(profile.emails[0].value);

  if (!user) {
    user = await createUserFromGoogleProfile(profile);
  }

  return user;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3001/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await findOrCreateUser(profile);
      return done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      const user = await loginUser(email, password);
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      return done(null, user);
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(jwtOptions, function (jwtPayload, done) {
    const user = getUserById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  })
);

function generateJwtToken(user: User): string {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string
  );
  return token;
}

function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
}

function authRoutes(): Router {
  const express = require('express');
  const router = express.Router();

  router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    function (req: Request, res: Response) {
      const token = generateJwtToken(req.user as User);
      res.json({ token });
    }
  );

  router.get(
    '/protected',
    authenticateJwt,
    function (req: Request, res: Response) {
      res.json({ message: 'Protected content' });
    }
  );

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
    })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    function (req: Request, res: Response) {
      const token = generateJwtToken(req.user as User);
      res.json({ token });
    }
  );
  return router;
}

function authController(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate(
    'local',
    { session: false },
    async function (err, user, info) {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateJwtToken(user as User);
        res.json({ token });
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
}

export { generateJwtToken, authenticateJwt, authRoutes, authController };
