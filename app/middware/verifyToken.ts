import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
  admin?: any;
}

export const VerifyUserToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    jwt.verify(token, secret!, (err, user: any) => {
      if (err) {
        res.status(401).json({
          meta: {
            success: false,
            message: "invalid-token",
          },
        });
      }
      req.user = user.data;

      if (req.user.status === "verified") {
        next();
      } else {
        res.status(403).json({
          meta: {
            success: false,
            message: "forbidden",
          },
        });
      }
    });
  } else {
    res.status(401).json({
      meta: {
        success: false,
        message: "invalid-token",
      },
    });
  }
};

export const VerifyAdminToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret!, (err, admin: any) => {
      if (err) {
        return res.status(401).json({
          meta: {
            success: false,
            message: "invalid-token",
          },
        });
      }

      req.admin = admin.data;

      if (req.admin.status === "admin") {
        next();
      } else {
        res.status(403).json({
          meta: {
            success: false,
            message: "forbidden",
          },
        });
      }
    });
  } else {
    res.status(401).json({
      meta: {
        success: false,
        message: "invalid-token",
      },
    });
  }
};

export const VerifyAllToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret!, (err, all: any) => {
      if (err) {
        return res.status(401).json({
          meta: {
            success: false,
            message: "invalid-token",
          },
        });
      }

      req.user = all.data;

      next();
    });
  } else {
    res.status(401).json({
      meta: {
        success: false,
        message: "invalid-token",
      },
    });
  }
};
