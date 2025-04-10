import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../modules/user/user.model';

interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = async(req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.jwt;
    
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export default authMiddleware;