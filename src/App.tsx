import React, { Component } from 'react';
import './App.css';
import { StorageService } from './utils/StorageService';

interface AppProps {}

interface AppState {
  searchTerm: string;
}

class App extends Component<AppProps, AppState> {
  storageService = new StorageService();

  state: AppState = {
    searchTerm: '',
  };

  componentDidMount() {
    const term = this.storageService.getTerm();
    if (term !== null) {
      this.setState({ searchTerm: term });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    if (this.state.searchTerm.trim() !== '') {
      this.storageService.setTerm(this.state.searchTerm);
    }
  };

  render() {
    return (
      <div className="content">
        <div className="search_side">
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>SEARCH</button>
        </div>
        <div className="result_side">result....</div>
      </div>
    );
  }
}

export default App;
