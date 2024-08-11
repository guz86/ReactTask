import { STORAGE_KEY } from '../constants';

export const getTerm = (): string | null => {
  return localStorage.getItem(STORAGE_KEY);
};

export const setTerm = (value: string): void => {
  localStorage.setItem(STORAGE_KEY, value);
};
