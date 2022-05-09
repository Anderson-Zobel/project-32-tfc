import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import ILogin from '../../interfaces/ILogin';
import Users from '../models/Users';

const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

export default class LoginService {
  constructor(private usersModel = Users) {}

  public async getUser(user: string): Promise<string | void> {
    const userValid = await this.usersModel.findOne({ where: { email: user } });
    if (userValid) {
      const { role } = userValid;
      return role;
    }
  }

  public async getLogin(login: ILogin) {
    const findUser = await this.usersModel.findOne({ where: { email: login.email } });

    if (findUser) {
      const { id, username, role, email } = findUser;
      const userResponse = { id, username, role, email };

      const payload = { data: login.email };
      const jwtConfig: jwt.SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
      const token = jwt.sign(payload, jwtSecret, jwtConfig);

      return {
        user: userResponse,
        token,
      };
    }
  }

}