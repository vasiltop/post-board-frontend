import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send({ sucess: false });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
    res.locals.user = verified;
    next();
  } catch (e) {
    res.status(401).send({ success: false, error: e });
  }
}
