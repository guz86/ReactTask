'use client';
import React, { useState, useEffect } from 'react';
import { AppProps } from '../Interfaces';
import SearchInput from './SearchInput/SearchInput';
import SearchResult from './SearchResult/SearchResult';
import useLocalStorage from '../hooks/useLocalStorage';
import Pagination from './Pagination/Pagination';
import { useSearchCharactersQuery } from '../apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Notification from './Notification/Notification';
import { useRouter } from 'next/navigation';

const Results: React.FC<AppProps> = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const { data, error, isLoading } = useSearchCharactersQuery({
    term: query,
    page: currentPage,
  });

  useEffect(() => {
    router.push(`/?page=${currentPage}&term=${query}`);
  }, [currentPage, query, router]);

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

  const selectedItems = useSelector((state: RootState) => state.selectedItems);

  return (
    <div className="content">
      <Notification count={selectedItems.length} />
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
