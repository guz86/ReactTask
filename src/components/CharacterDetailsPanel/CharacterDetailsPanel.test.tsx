import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetailsPanel from './CharacterDetailsPanel';
import { Character } from '../../Interfaces';

const testCharacter: Character = {
  name: 'John Doe',
  height: '180',
  mass: '75',
  hair_color: 'brown',
  skin_color: 'light',
  eye_color: 'blue',
  birth_year: '1990',
  gender: 'male',
  url: 'http://example.com/johndoe',
};

test('renders CharacterDetailsPanel with character details', () => {
  const onClose = jest.fn();
  render(<CharacterDetailsPanel character={testCharacter} onClose={onClose} />);

  expect(screen.getByText(/Character Details/i)).toBeInTheDocument();

  expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.name)).toBeInTheDocument();

  expect(screen.getByText(/Height:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.height)).toBeInTheDocument();

  expect(screen.getByText(/Mass:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.mass)).toBeInTheDocument();

  expect(screen.getByText(/Hair Color:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.hair_color)).toBeInTheDocument();

  expect(screen.getByText(/Skin Color:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.skin_color)).toBeInTheDocument();

  expect(screen.getByText(/Eye Color:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.eye_color)).toBeInTheDocument();

  expect(screen.getByText(/Birth Year:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.birth_year)).toBeInTheDocument();

  expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
  expect(screen.getByText(testCharacter.gender)).toBeInTheDocument();

  const closeButton = screen.getByText(/Close/i);
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);
  expect(onClose).toHaveBeenCalledTimes(1);
});
