// lib/cache.js
const cache = new Map();
const CACHE_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

export const setCache = (key: string, value: any) => {
  cache.set(key, { value, expiration: Date.now() + CACHE_EXPIRATION_TIME });
};

export const getCache = (key: string) => {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiration) {
    cache.delete(key);
    return null;
  }
  return cached.value;
};

export const clearCache = (key: string) => {
  cache.delete(key);
};

export const clearAllCache = () => {
  cache.clear();
};
