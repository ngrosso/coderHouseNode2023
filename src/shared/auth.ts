import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const createHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const isValidPassword = async (password: string, passwordHash: string): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

export const generateToken = async (user: any): Promise<string> => {
  return await jwt.sign({ user: { ...user, password: undefined } }, config.JWT_PRIVATE_KEY, { expiresIn: '60m' });
};

export const verifyToken = async (token: string): Promise<any> => {
  return await jwt.verify(token, config.JWT_PRIVATE_KEY);
};
