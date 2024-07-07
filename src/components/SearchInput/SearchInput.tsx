import './SearchInput.css';
import { Component } from 'react';
import { SearchInputProps } from '../../Interfaces';

class SearchInput extends Component<SearchInputProps> {
  render() {
    const { searchTerm, onInputChange, onSearch, onErrorTest } = this.props;

    return (
      <div className="search_side">
        <input type="text" value={searchTerm} onChange={onInputChange} />
        <button onClick={onSearch}>SEARCH</button>
        <button onClick={onErrorTest}>Click to test</button>
      </div>
    );
  }
}

export default SearchInput;
