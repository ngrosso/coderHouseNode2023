import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const createHash = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) => {
  return await jwt.sign({ user: { ...user, password: undefined } }, config.JWT_PRIVATE_KEY, { expiresIn: '60m' });
}

export const verifyToken = async (token) => {
  return await jwt.verify(token, config.JWT_PRIVATE_KEY);
}