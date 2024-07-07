import React, { Component } from 'react';
import './App.css';
import { StorageService } from '../utils/StorageService';
import { ApiService } from '../utils/ApiService';
import { PEOPLE_SEARCH_URL } from '../constants';
import { AppProps, AppState, Character } from '../Interfaces';
import SearchInput from '../components/SearchInput/SearchInput';
import SearchResult from '../components/SearchResult/SearchResult';

class App extends Component<AppProps, AppState> {
  storageService = new StorageService();
  getData = new ApiService();

  state: AppState = {
    searchTerm: '',
    searchData: null,
    error: false,
    errorMessage: '',
    loading: false,
  };

  componentDidMount() {
    const term = this.storageService.getTerm();
    if (term) {
      this.setState({ searchTerm: term });
      this.getSearchData(term);
    } else {
      this.getSearchData('');
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
      error: false,
      errorMessage: '',
    });
  };

  handleSearch = () => {
    if (this.state.searchTerm.trim() !== '') {
      this.storageService.setTerm(this.state.searchTerm);
      this.getSearchData(this.state.searchTerm);
    } else {
      this.getSearchData('');
    }
  };

  getSearchData = (term: string) => {
    this.setState({ loading: true });
    const url = `${PEOPLE_SEARCH_URL}${term}`;
    this.getData
      .fetchData<Character>(url)
      .then((searchData) => {
        this.setState({ searchData, error: false, loading: false });
      })
      .catch(() => {
        this.setState({
          error: true,
          errorMessage: 'Error getData failed',
          loading: false,
        });
      });
  };

  throwError = () => {
    this.setState({ error: true, errorMessage: 'Throw manual error for test' });
  };

  render() {
    const { searchTerm, searchData, error, errorMessage, loading } = this.state;

    if (error) {
      throw new Error('Manual error for test');
    }

    return (
      <div className="content">
        <SearchInput
          searchTerm={searchTerm}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
          onErrorTest={this.throwError}
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
  }
}

export default App;
