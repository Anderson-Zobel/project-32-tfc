import { Router } from 'express';
import validations from '../middlewares'
import controllers from '../database/controllers';

const login = Router();

login.post(
  '/', 
  validations.login,
  controllers.loginController.login,
);

login.get(
  '/validate', 
  validations.auth,
  controllers.loginController.validate,
)

export default login;