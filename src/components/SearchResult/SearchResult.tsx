import React, { useState } from 'react';
import './SearchResult.css';
import { Character, SearchResultProps } from '../../Interfaces';
import { extractIdFromUrl } from '../../utils/extractIdFromUrl';
import CharacterDetailsPanel from '../CharacterDetailsPanel';

const SearchResult: React.FC<SearchResultProps> = ({
  loading,
  error,
  errorMessage,
  searchTerm,
  searchData,
  items,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleClosePanel = () => {
    setSelectedCharacter(null); // Reset selectedCharacter to close the panel
  };

  if (error) {
    throw new Error('Manual error for test');
  }

  return (
    <div className="search-result-container">
      <div className="result_side">
        <h2>Search result: {searchTerm}</h2>
        {loading && <div className="spinner"></div>}
        {error && <p className="error-message">{errorMessage}</p>}
        {searchData && (
          <ul>
            {searchData.map((character: Character) => (
              <li key={extractIdFromUrl(character.url)}>
                <div className="character-header">
                  <div className="character-id">
                    {extractIdFromUrl(character.url)}
                  </div>
                  <div className="character-name">{character.name}</div>
                  <button onClick={() => handleCharacterClick(character)}>
                    Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <>All: {items}</>
      </div>
      {selectedCharacter && (
        <CharacterDetailsPanel
          character={selectedCharacter}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};

export default SearchResult;
