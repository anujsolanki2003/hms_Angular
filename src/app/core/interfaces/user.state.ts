import { User } from './user.data';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
