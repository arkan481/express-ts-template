import { userModel } from '../models';
import { User } from '../typings/interfaces';

const createUser = async (user: User) => userModel.create(user);

const checkEmailExists = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (user) {
    return true;
  }

  return false;
};

export { createUser, checkEmailExists };
