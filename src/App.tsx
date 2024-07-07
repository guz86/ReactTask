import React, { Component } from 'react';
import './App.css';
import { StorageService } from './utils/StorageService';
import { ApiService } from './utils/ApiService';
import { PEOPLE_SEARCH_URL } from './constants';
import { AppProps, AppState, Character } from './Interfaces';

class App extends Component<AppProps, AppState> {
  storageService = new StorageService();
  getData = new ApiService();

  state: AppState = {
    searchTerm: '',
    searchData: null,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const term = this.storageService.getTerm();
    if (term !== null) {
      this.setState({ searchTerm: term });
      this.getSearchData(term);
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
    const url = `${PEOPLE_SEARCH_URL}${term}`;
    this.getData
      .fetchData<Character>(url)
      .then((searchData) => {
        this.setState({ searchData, error: false });
      })
      .catch(() => {
        this.setState({ error: true, errorMessage: 'Error getData failed' });
      });
  };

  extractIdFromUrl = (url: string): string => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : 'Unknown';
  };

  throwError = () => {
    this.setState({ error: true, errorMessage: 'Throw manual error for test' });
  };

  render() {
    const { searchTerm, searchData, error, errorMessage } = this.state;

    if (error) {
      throw new Error('Manual error for test');
    }

    return (
      <div className="content">
        <div className="search_side">
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>SEARCH</button>
          <button onClick={this.throwError}>Сlick to test</button>
        </div>
        <div className="result_side">
          <h2>Search result: {searchTerm}</h2>
          {error && <p className="error-message">{errorMessage}</p>}
          {searchData && (
            <ul>
              {searchData.map((character: Character) => (
                <li key={this.extractIdFromUrl(character.url)}>
                  <div className="character-header">
                    <div className="character-id">
                      ID: {this.extractIdFromUrl(character.url)}
                    </div>
                    <div className="character-name">{character.name}</div>
                  </div>
                  <div className="character-details">
                    <div>Height: {character.height}</div>
                    <div>Mass: {character.mass}</div>
                    <div>Hair Color: {character.hair_color}</div>
                    <div>Skin Color: {character.skin_color}</div>
                    <div>Eye Color: {character.eye_color}</div>
                    <div>Birth Year: {character.birth_year}</div>
                    <div>Gender: {character.gender}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
