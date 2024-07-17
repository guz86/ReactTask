import { getTerm, setTerm } from './storageService';

describe('Storage Service', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('should set and get term from localStorage', () => {
    const testTerm = 'exampleTerm';

    setTerm(testTerm);
    const retrievedTerm = getTerm();

    expect(retrievedTerm).toEqual(testTerm);
  });

  test('should return null when term is not set', () => {
    const retrievedTerm = getTerm();

    expect(retrievedTerm).toBeNull();
  });

  test('should overwrite existing term with new value', () => {
    const initialTerm = 'initialTerm';
    const updatedTerm = 'updatedTerm';
    setTerm(initialTerm);
    setTerm(updatedTerm);
    const retrievedTerm = getTerm();

    expect(retrievedTerm).toEqual(updatedTerm);
  });
});
