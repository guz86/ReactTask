import React, { useState, useEffect } from 'react';
import './App.css';
import { PEOPLE_SEARCH_URL } from '../constants';
import { AppProps, Character } from '../Interfaces';
import SearchInput from '../components/SearchInput/SearchInput';
import SearchResult from '../components/SearchResult/SearchResult';
import { fetchData } from '../utils/apiService';
import useLocalStorage from '../hooks/useLocalStorage';
import { getTerm } from '../utils/storageService';

const App: React.FC<AppProps> = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [searchData, setSearchData] = useState<Character[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedTerm = getTerm();
    if (storedTerm) {
      getSearchData(storedTerm.trim());
    } else {
      getSearchData('');
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setError(false);
    setErrorMessage('');
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      getSearchData(searchTerm);
    } else {
      getSearchData('');
    }
  };

  const getSearchData = (term: string) => {
    setLoading(true);
    const url = `${PEOPLE_SEARCH_URL}${term}`;
    fetchData<Character>(url)
      .then((searchData) => {
        setSearchData(searchData);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Error getting data');
        setLoading(false);
      });
  };

  const throwError = () => {
    setError(true);
    setErrorMessage('Throw manual error for test');
  };

  if (error) {
    throw new Error('Manual error for test');
  }

  return (
    <div className="content">
      <SearchInput
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onErrorTest={throwError}
      />
      <SearchResult
        loading={loading}
        error={error}
        errorMessage={errorMessage}
        searchTerm={searchTerm}
        searchData={searchData}
      />
    </div>
  );
};

export default App;
