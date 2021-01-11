import config from '../../config';
import { cacheRead, cacheWrite } from '../../utils/cache';
import { login } from './auth';
import { query } from './query';

const CACHE_KEY = 'divvy.accessToken';

async function doCachedLogin(): Promise<string> {
  let token: string | undefined = await cacheRead<string>(CACHE_KEY);
  if (!token) {
    const { token: { exp }, signedString } = await login(config.divvy.username, config.divvy.password);
    token = signedString;
    await cacheWrite(CACHE_KEY, token, new Date(exp * 1000));
  }

  if (!token) throw new Error('Login was unsuccessful.');
  return token;
}

export async function getTransactions(start: Date, end: Date) {

}

export async function getPayments(start: Date, end: Date) {

}
