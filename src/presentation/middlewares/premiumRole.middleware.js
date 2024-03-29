import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const premiumUser = (req, res, next) => {
  const authHeader = req.headers.authorization ?? `Bearer ${req.cookies.accessToken}`;

  if (!authHeader) {
    req.logger.error('Empty authentication header!');
    return res.status(401).send({ message: 'Empty authentication header!' })
  }

  const token = authHeader.split(' ')[1]; // Bearer tokenString(

  jwt.verify(token, config.JWT_PRIVATE_KEY, (error, credentials) => {
    if (error || (!credentials.user.premium && !credentials.user.admin)) {
      req.logger.error('Authentication error');
      return res.status(403).send({ success: false, error: 'Authentication error' });
    }

    req.userInfo = credentials.user;
    next();
  });
}

export default premiumUser;
