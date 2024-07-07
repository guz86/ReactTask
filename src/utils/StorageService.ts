import { STORAGE_KEY } from '../constants';

export class StorageService {
  getTerm(): string | null {
    const term = localStorage.getItem(STORAGE_KEY);
    return term;
  }

  setTerm(value: string) {
    localStorage.setItem(STORAGE_KEY, value);
  }
}
