import jwt from "jsonwebtoken";
import config from 'config';

export const authMiddleware = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const [, token] = req.headers.authorization.split(' '); //Bearer "TOKEN"
 
    if (!token) {
      res.status(401).send({
        message: "not authenticated"
      })
    }

    const decodedToken = jwt.verify(token, config.get('jwtSecret'));

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).send({
      message: "not authenticated"
    })
  }
}