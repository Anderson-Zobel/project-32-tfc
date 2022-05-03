import { Request, Response, NextFunction } from 'express';

export default function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'email and password must be a string'});
  }

  const emailVerify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailVerify.test(email)) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  
  
}