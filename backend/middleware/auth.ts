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
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Request, Response, NextFunction, Router } from 'express';

import { User } from '../interfaces/User';

async function findOrCreateUser(profile: Profile) {
  let user = await getUserByEmail(profile.emails?.[0]?.value || '');

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
      callbackURL: 'http://localhost:3010/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const user = await findOrCreateUser(profile);
      return done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(
    //to login, you need email and password, usernameField is set to 'email' and passwordField set to password for the local passport strategy, so local users must use a valid email and passport to log in
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
  //assigns a jwt to user
  new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
    const user = await getUserById(jwtPayload.id);
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
  passport.authenticate(
    //authenticates the json webtoken which was generated
    'jwt',
    { session: false },
    function (err: Error, user: Express.User | undefined, info: String) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // console.log('user dawgy:', user);
      req.user = user;
      next();
    }
  )(req, res, next);
}

function authRoutes(): Router {
  const express = require('express');
  const router = express.Router();
  //google login strategy
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
    })
  );
  //google login strategy
  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    function (req: Request, res: Response) {
      const token = generateJwtToken(req.user as User);
      res.cookie('token', token, { sameSite: 'none', secure: true });
      res.redirect('http://localhost:3000');
    }
  );
  return router;
}

function authController(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate(
    'local',
    { session: false },
    async function (err: any, user: User, info: any) {
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
