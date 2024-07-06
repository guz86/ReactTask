export class StorageService {
  getTerm(): string | null {
    const term = localStorage.getItem('term');
    return term;
  }

  setTerm(value: string) {
    localStorage.setItem('term', value);
  }
}
