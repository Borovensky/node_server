import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // or 'strict' for even tighter security
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  })
});

