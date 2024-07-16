import React from 'react';
import './CharacterDetailsPanel.css';
import { Character } from '../../Interfaces';

interface CharacterDetailsPanelProps {
  character: Character;
  onClose: () => void;
}

const CharacterDetailsPanel: React.FC<CharacterDetailsPanelProps> = ({
  character,
  onClose,
}) => {
  const handlePanelClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      (event.target as HTMLDivElement).classList.contains(
        'character-details-panel'
      )
    ) {
      onClose();
    }
  };

  return (
    <div className="character-details-panel" onClick={handlePanelClick}>
      <h3>Character Details</h3>
      <div className="detail-item">
        <label>Name:</label>
        <span className="detail-value">{character.name}</span>
      </div>
      <div className="detail-item">
        <label>Height:</label>
        <span className="detail-value">{character.height}</span>
      </div>
      <div className="detail-item">
        <label>Mass:</label>
        <span className="detail-value">{character.mass}</span>
      </div>
      <div className="detail-item">
        <label>Hair Color:</label>
        <span className="detail-value">{character.hair_color}</span>
      </div>
      <div className="detail-item">
        <label>Skin Color:</label>
        <span className="detail-value">{character.skin_color}</span>
      </div>
      <div className="detail-item">
        <label>Eye Color:</label>
        <span className="detail-value">{character.eye_color}</span>
      </div>
      <div className="detail-item">
        <label>Birth Year:</label>
        <span className="detail-value">{character.birth_year}</span>
      </div>
      <div className="detail-item">
        <label>Gender:</label>
        <span className="detail-value">{character.gender}</span>
      </div>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CharacterDetailsPanel;
