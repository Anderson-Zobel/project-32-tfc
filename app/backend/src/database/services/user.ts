import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import LoginInterface from '../../interfaces/Login';
import usersModel from '../models/Users';

const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

export default class LoginService {
  constructor(private users = usersModel) {}

  public async getLogin(login: LoginInterface) {
    const response = await this.users.findOne({ where: { email: login.email } });

    if (response) {
      const { id, username, role, email } = response;
      const result = { id, username, role, email };

      const data = { data: login.email };
      
      const jwtConfig: jwt.SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
      const token = jwt.sign(data, jwtSecret, jwtConfig);

      return {
        user: result,
        token,
      };
    }
  }
}