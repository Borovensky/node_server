// Business logic (hashing, validation, etc.)
import bcrypt from 'bcryptjs';
import User, { IUser } from './user.model';

interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (input: IUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(input.password, salt);

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });
  
  return user;
};

export const loginUser = async (input: { email: string; password: string }): Promise<IUser> => {
  const user = await User.findOne({ email: input.email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare provided password with hashed password
  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};
