import { NextFunction, Request, Response } from "express";
import basicAuth from "basic-auth";

export interface User {
  name: string;
  pass: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const checkBasicAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const unauthorized = (res: Response) => {
    res
      .status(401)
      .json({ message: "Unauthorized. Please provide valid credentials." });
  };

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  // Replace 'username' and 'password' with your desired username and password
  if (
    user.name === process.env.BASIC_AUTH_USERNAME &&
    user.pass === process.env.BASIC_AUTH_PASSWORD
  ) {
    req.user = { name: user.name, pass: user.pass };
    return next();
  } else {
    return unauthorized(res);
  }
};
