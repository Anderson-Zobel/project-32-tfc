import { Request, Response, NextFunction } from 'express';
import ILogin from '../../interfaces/ILogin';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const login: ILogin = { email, password };

      const user = await this.loginService.getLogin(login);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async validation(req: Request, res: Response): Promise<Response | void> {
    const { decoded: { data } } = req.body;
    const user = await this.loginService.getUser(data);
    return res.status(200).json(user);
  }
}

const login = new LoginController();

const log = async (req: Request, res: Response, next: NextFunction) => login.login(req, res, next)

const validate =  async (req: Request, res: Response) => login.validation(req, res)

export default {
  log,
  validate,
}