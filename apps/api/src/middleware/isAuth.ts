import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

type decodedToken = {
  id: string;
  iat: number;
  exp: number;
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.cookies.token;
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(authHeader, jwtSecret) as decodedToken;
    req.userId = decoded.id as string;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};