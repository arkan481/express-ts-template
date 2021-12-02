import { Schema, model } from 'mongoose';
import { User } from '../typings/interfaces';

const UserSchema = new Schema<User>({
  username: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  age: {
    type: 'number',
    required: false,
  },
  password: {
    type: 'string',
    required: true,
  },
});

export default model('User', UserSchema);
