import { Request, Response, NextFunction } from 'express';
import ILogin from '../../interfaces/ILogin';
import LoginService from '../services/login.service';



  const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const login: ILogin = { email, password };

      const user = await LoginService.getLogin(login);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  const validate = async (req: Request, res: Response): Promise<Response | void> => {
    const { decoded: { data } } = req.body;
    const user = await LoginService.getUser(data);
    return res.status(200).json(user);
  }


// const login = new LoginController();

// const log = async (req: Request, res: Response, next: NextFunction) => login.login(req, res, next)

// const validate =  async (req: Request, res: Response) => login.validation(req, res)

export default {
  login,
  validate,
}