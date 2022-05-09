import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { NextFunction, Request, Response } from 'express';

const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.body = { ...req.body, decoded };

    next();
  } catch (e) {
    next(e);
  }
};
export default auth;