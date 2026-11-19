import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/config";

interface Auth {
  userId: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      auth?: Auth;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token after 'Bearer'

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; roles: string[] };

    // Attach decoded user data to the request object for use in subsequent handlers
    req.auth = {
      userId: decoded.userId,
      roles: decoded.roles,
    };

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
