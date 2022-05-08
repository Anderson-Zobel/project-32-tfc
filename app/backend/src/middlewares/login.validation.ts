import { Request, Response, NextFunction } from 'express';

export default function validationLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const isEmailValid = regex.test(email);

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!isEmailValid) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
}