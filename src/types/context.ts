import { Request } from 'express';
import { User } from '../schema/user.schema';
export interface Context {
  req: Request;
  user: User;
  ip: any;
  md: any;
}
