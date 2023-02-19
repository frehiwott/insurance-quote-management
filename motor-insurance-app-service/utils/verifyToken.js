import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  console.log("under verify token");
  const token = req.headers.authorization.split(" ")[1];
  console.log("toke is ", token.split(" ")[1]);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log("err is ", err, err.message);
    if (err) return next(createError(403, err.message));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const decodeJWTToken = (token) => {
  console.log("decoded jwt token ....", token, jwt.decode(token.split(" ")[1]));
  return jwt.decode(token.split(" ")[1]);
};
