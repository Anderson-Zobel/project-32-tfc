import userModel from '../models/Users'
import token from '../../tools/token';

const loginService = async (email: string, password: string) => {
  const user = await userModel.findOne({ where: { email } });
  const getToken = token({ email, password });

  if (user) {
    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token: getToken,
    }
  }
};

export default loginService;