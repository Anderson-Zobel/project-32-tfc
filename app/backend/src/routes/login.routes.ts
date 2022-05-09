import { Router } from 'express';
import loginValidation from '../middlewares/login.validation'
import auth from '../middlewares/auth'
import LoginController from '../database/controller/login.controller';

const login = Router();

const loginControllers = new LoginController();

login.post(
  '/login', 
  loginValidation,
  async (req, res, next) => loginControllers.login(req, res, next),
);

login.get(
  '/validate',
  auth,
  async (req, res, next) => loginControllers.validation(req, res),
)

export default login;