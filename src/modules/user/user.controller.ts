// Signup and login handles
import { Request, Response, NextFunction } from 'express';
// import { createUser, loginUser } from './user.service';
// import { generateToken } from '../../utils/generateToken';


export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.body);
    res.status(201).json({
      message: "success"
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error: any) {
    error.status = 400;
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.body);
    res.status(201).json({
      message: "success"
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error: any) {
    error.status = 400;
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.body);
    res.status(201).json({
      message: "success"
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error: any) {
    error.status = 400;
    next(error);
  }
};