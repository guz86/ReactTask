import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectItem,
  deselectItem,
  clearSelection,
} from '../../selectedItemsSlice';
import './SearchResult.css';
import { Character, SearchResultProps } from '../../Interfaces';
import { extractIdFromUrl } from '../../utils/extractIdFromUrl';
import CharacterDetailsPanel from '../CharacterDetailsPanel/CharacterDetailsPanel';
import { RootState } from '../../store';
import DownloadButton from '../DownloadButton/DownloadButton';

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
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems);

  const handleCheckboxChange = (character: Character, isChecked: boolean) => {
    const id = extractIdFromUrl(character.url);
    if (isChecked) {
      dispatch(selectItem(id));
    } else {
      dispatch(deselectItem(id));
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleClosePanel = () => {
    setSelectedCharacter(null); // Reset selectedCharacter to close the panel
  };

  const handleUnselectAll = () => {
    dispatch(clearSelection());
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
            {searchData.map((character: Character) => {
              const id = extractIdFromUrl(character.url);
              return (
                <li key={extractIdFromUrl(character.url)}>
                  <div className="character-header">
                    <div className="character-info">
                      <input
                        className="check-input"
                        type="checkbox"
                        checked={selectedItems.includes(id)}
                        onChange={(e) =>
                          handleCheckboxChange(character, e.target.checked)
                        }
                      />
                      <div className="character-id">
                        {extractIdFromUrl(character.url)}.
                      </div>
                      <div className="character-name">{character.name}</div>
                    </div>
                    <button
                      className="details-button"
                      onClick={() => handleCharacterClick(character)}
                    >
                      Details
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <>
          All: {items}
          {selectedItems.length > 0 && (
            <button onClick={handleUnselectAll} className="unselect-all-button">
              Unselect all
            </button>
          )}
          {selectedItems.length > 0 && (
            <DownloadButton selectedItems={selectedItems} />
          )}
        </>
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
