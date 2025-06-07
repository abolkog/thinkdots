export const STORAGE_PREFIX = '@thinktods_';

export const getItem = (key: string, defaultValue = '') => {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  return localStorage.getItem(prefixedKey) || defaultValue;
};

export const setItem = (key: string, value: string) => {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  localStorage.setItem(prefixedKey, value);
};

export const removeItem = (key: string) => {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  localStorage.removeItem(prefixedKey);
};
