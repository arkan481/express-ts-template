import { User } from '../typings/interfaces';
import {
  createUser as createUserRepo,
  checkEmailExists,
} from '../repositories/authRepository';

const createUser = async (user: User) => {
  const newUser = createUserRepo(user);
  return newUser;
};

const checkForExistingEmail = async (email: string) => checkEmailExists(email);

export { createUser, checkForExistingEmail };
