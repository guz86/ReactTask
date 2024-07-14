import React, { useState, useEffect } from 'react';
import { PEOPLE_SEARCH_URL } from './constants';
import { AppProps, Character } from './Interfaces';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchResult/SearchResult';
import { fetchData, fetchDataCount } from './utils/apiService';
import useLocalStorage from './hooks/useLocalStorage';
import { getTerm } from './utils/storageService';
import Pagination from './components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const App: React.FC<AppProps> = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [searchData, setSearchData] = useState<Character[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [items, setItems] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTerm = getTerm();
    if (storedTerm) {
      getSearchData(storedTerm.trim(), 1);
    } else {
      getSearchData('', 1);
    }
  }, []);

  useEffect(() => {
    getSearchData(searchTerm.trim(), currentPage);
    navigate(`?page=${currentPage}`);
  }, [currentPage, navigate, searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setError(false);
    setErrorMessage('');
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      getSearchData(searchTerm, 1);
    } else {
      getSearchData('', 1);
    }
  };

  const getSearchData = (term: string, page: number) => {
    setLoading(true);
    const url = `${PEOPLE_SEARCH_URL}${term}&page=${page}`;
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
    fetchDataCount(url)
      .then((searchData) => {
        setItems(searchData);
      })
      .catch(() => {
        setErrorMessage('Error fetchDataCount data');
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
        items={items}
      />
      {!loading && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={items}
        />
      )}
    </div>
  );
};

export default App;
