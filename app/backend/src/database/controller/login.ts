import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginService(email, password);

  if (!user) 
  return res.status(400).json({ message: 'Incorrect email or password'});
  res.status(200).json(user);
};

export default login;