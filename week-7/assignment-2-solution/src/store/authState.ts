import { atom } from 'recoil';

interface AuthData{
  token: string | null;
  username: string | null;
}
export const authState = atom<AuthData>({
  key: 'authState',
  default: { token: null, username: null },
});