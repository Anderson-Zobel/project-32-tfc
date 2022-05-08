import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import ILogin from '../interfaces/ILogin'

const tokenConfig = { expiresIn: '7d' };

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

export default (payload: ILogin) => jwt.sign(payload, SECRET, tokenConfig);