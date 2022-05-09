import { Router } from 'express';
import validations from '../middlewares'
import controllers from '../database/controllers';

const login = Router();

// const loginControllers = new LoginController();

login.post(
  '/', 
  validations.login,
  controllers.login.log,
);

login.get(
  '/validate', 
  validations.auth,
  controllers.login.validate,
)

export default login;