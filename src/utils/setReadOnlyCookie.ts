import { Response } from 'express';

export const setReadOnlyCookie = (res: Response, token: string): void => {
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // !!! 
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};
