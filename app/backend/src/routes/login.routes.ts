import { Router } from 'express';
import controllers from '../database/controller';
import loginValidation from '../middlewares/login.validation';

const login = Router();


login.post(
  '/login',
  loginValidation,
  controllers.login
)

export default login;