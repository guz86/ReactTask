import { useEffect, useState } from 'react';
import { getTerm, setTerm } from '../utils/storageService';

const useLocalStorage = (): [string, (value: string) => void] => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedTerm = getTerm();
    if (storedTerm) {
      setSearchTerm(storedTerm);
    }
  }, []);

  const updateTerm = (value: string) => {
    setSearchTerm(value);
    setTerm(value);
  };

  return [searchTerm, updateTerm];
};

export default useLocalStorage;
