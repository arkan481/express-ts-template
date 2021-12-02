import { string, number, SchemaOf, object } from 'yup';
import { User } from '../typings/interfaces';

const userValidationSchema: SchemaOf<User> = object({
  username: string().min(5).max(10).defined(),
  age: number().notRequired(),
  email: string().email().defined(),
  password: string().min(8).max(32).defined(),
});

export default userValidationSchema;
