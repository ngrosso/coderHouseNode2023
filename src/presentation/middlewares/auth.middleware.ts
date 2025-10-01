import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization ?? `Bearer ${(req as any).cookies.accessToken}`;

  if (!authHeader) {
    (req as any).logger.error('Empty authentication header!');
    return res.status(401).send({ message: 'Empty authentication header!' });
  }

  const token = authHeader.split(' ')[1]; // Bearer tokenString(

  jwt.verify(token, config.JWT_PRIVATE_KEY, (error: any, credentials: any) => {
    if (error) {
      (req as any).logger.error('Authentication error');
      return res.status(403).send({ success: false, error: 'Authentication error' });
    }

    (req as any).userInfo = credentials.user;
    next();
  });
};

export default auth;
