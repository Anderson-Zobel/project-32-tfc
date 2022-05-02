import { NextFunction, Request, Response } from 'express';
import loginInterface from '../../interfaces/Login';
import userService  from '../services/user'

class UserC {
  constructor(private uService = new userService()) {}

  async getLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const login: loginInterface = { email, password };
      
      const user = await this.uService.getLogin(login);

      return res.status(200).json(user);
    
    } catch(e) {
    next(e);
    }
  }
}


const uControlller = new UserC();

const login = async (req: Request, res: Response, next: NextFunction) => uControlller.getLogin(req, res, next);

export default login;


