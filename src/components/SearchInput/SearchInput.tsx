import React from 'react';
import './SearchInput.css';
import { SearchInputProps } from '../../Interfaces';

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onInputChange,
  onSearch,
  //onErrorTest,
}) => {
  return (
    <div className="search_side">
      <input type="text" value={searchTerm} onChange={onInputChange} />
      <button onClick={onSearch}>SEARCH</button>
      {/* <button onClick={onErrorTest}>Click to test</button> */}
    </div>
  );
};

export default SearchInput;
