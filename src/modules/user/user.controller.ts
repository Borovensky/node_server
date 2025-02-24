// Signup and login handles
import { Request, Response, NextFunction } from 'express';
import { createUser, loginUser } from './user.service';
import { setReadOnlyCookie } from '../../utils/setReadOnlyCookie';
import { generateToken } from '../../utils/jwtToken';

/**
 * @route POST /api/v1/auth/signup
 * @group Auth - Operations about authentication
 * @param {object} req.body.required - The signup credentials.
 * @param {string} req.body.username.required - The user's username.
 * @param {string} req.body.email.required - The user's email.
 * @param {string} req.body.password.required - The user's password.
 * @returns {object} 201 - Signup successful response with a success message.
 * @returns {Error} 400 - Signup error response.
 */
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    /*  #swagger.tags = ["Auth"]
        #swagger.parameters['body'] = {
            in: "body",
            schema: { $ref: "#/definitions/signupParams" }
        }
    */
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    const token = generateToken(user.id.toString());
    
    // HTTP-only cookie
    setReadOnlyCookie(res, token);

    res.status(201).json({
      message: "success",
      user,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: any) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route POST /api/v1/auth/login
 * @group Auth - Operations about authentication
 * @param {object} req.body.required - The signup credentials.
 * @param {string} req.body.email.required - The user's email.
 * @param {string} req.body.password.required - The user's password.
 * @returns {object} 201 - Signup successful response with a success message.
 * @returns {Error} 400 - Signup error response.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    /*  #swagger.tags = ["Auth"]
        #swagger.parameters['body'] = {
          in: "body",
          schema: { $ref: "#/definitions/loginParams" }
        }
    */
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    const token = generateToken(user.id.toString());

    // HTTP-only cookie
    setReadOnlyCookie(res, token);

    res.status(201).json({
      message: "success",
      user,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: any) {
    error.status = 400;
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    /*  #swagger.tags = ["Auth"]
        
    */

    // HTTP-only cookie
    setReadOnlyCookie(res, '');

    res.status(201).json({
      message: "success"
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: any) {
    error.status = 400;
    next(error);
  }
};