import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization ?? `Bearer ${req.cookies.accessToken}`;

  if (!authHeader) {
    return res.status(401).send({ message: 'Empty authentication header!' })
  }

  const token = authHeader.split(' ')[1]; // Bearer tokenString

  jwt.verify(token, config.jwtPrivateKey, (error, credentials) => {
    if (error) return res.status(403).send({ error: 'Authentication error' });

    req.email = credentials.email;
    next();
  });
}

export default auth;
