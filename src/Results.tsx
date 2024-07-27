import React, { useState, useEffect } from 'react';
import { AppProps } from './Interfaces';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchResult/SearchResult';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { useSearchCharactersQuery } from './apiSlice';

const Results: React.FC<AppProps> = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

  const { data, error, isLoading } = useSearchCharactersQuery({
    term: query,
    page: currentPage,
  });

  useEffect(() => {
    navigate(`?page=${currentPage}`);
  }, [currentPage, navigate]);

  useEffect(() => {
    if (searchTerm) {
      setQuery(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setQuery(searchTerm);
    setCurrentPage(1);
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
        //onErrorTest={throwError}
      />
      <SearchResult
        loading={isLoading}
        error={!!error}
        errorMessage={error ? error : ''}
        searchTerm={searchTerm}
        searchData={data?.results || []}
        items={data?.count || 0}
      />
      {!isLoading && (data?.count ?? 0) > 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={data?.count || 0}
        />
      )}
    </div>
  );
};

export default Results;
