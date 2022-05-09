import { Request, Response, NextFunction } from 'express';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const validEmail = /\S+@\S+\.\S+/;
  
  if (!validEmail.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  // if (password.length <= 6 || typeof password !== 'string') {
  //   return res.status(401).json({ message: 'Incorrect email or password' });
  // }
  next();
}