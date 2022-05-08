import { Router } from 'express';
import validations from '../middlewares'
import controllers from '../database/controller';

const login = Router();

login.post(
  '/login', 
  validations.login,
  controllers.login,
);


export default login;