import React from 'react';
import './SearchResult.css';
import { Character, SearchResultProps } from '../../Interfaces';
import { extractIdFromUrl } from '../../utils/extractIdFromUrl';

const SearchResult: React.FC<SearchResultProps> = ({
  loading,
  error,
  errorMessage,
  searchTerm,
  searchData,
  items,
}) => {
  if (error) {
    throw new Error('Manual error for test');
  }

  return (
    <div className="result_side">
      <h2>Search result: {searchTerm}</h2>
      {/* <h2>Items: {items}</h2> */}
      {loading && <div className="spinner"></div>}
      {error && <p className="error-message">{errorMessage}</p>}
      {searchData && (
        <ul>
          {searchData.map((character: Character) => (
            <li key={extractIdFromUrl(character.url)}>
              <div className="character-header">
                <div className="character-id">
                  ID: {extractIdFromUrl(character.url)}
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
      <>{items}</>
    </div>
  );
};

export default SearchResult;
