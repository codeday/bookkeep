import fs, { read } from 'fs';
import path from 'path';

const CACHE_FILE = path.join(path.dirname(path.dirname(__dirname)), '.cache');

export interface CacheFile {
  [key: string]: CacheEntry<unknown> | undefined
}

export interface CacheEntry<T> {
  until: number
  data: T
}

async function readCache(): Promise<CacheFile> {
  if (!fs.existsSync(CACHE_FILE)) return {};
  return <CacheFile> JSON.parse((await fs.promises.readFile(CACHE_FILE)).toString());
}

async function writeCache(data: CacheFile): Promise<void> {
  await fs.promises.writeFile(CACHE_FILE, JSON.stringify(data));
}

export async function cacheWrite<T>(key: string, data: T, until: Date): Promise<void> {
  const cache = await readCache();
  cache[key] = <CacheEntry<T>> {
    until: Math.floor((+ until) / 1000),
    data,
  };
  writeCache(cache);
}

export async function cacheRead<T>(key: string): Promise<T | undefined> {
  const entry = <CacheEntry<T> | undefined> (await readCache())[key];
  if (typeof entry !== 'undefined' && entry.until > Math.floor((+ new Date) / 1000)) return entry.data;
}
