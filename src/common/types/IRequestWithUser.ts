import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: { userId: string };
}
