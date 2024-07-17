import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchResult from './SearchResult';
import { Character } from '../../Interfaces';
import { extractIdFromUrl } from '../../utils/extractIdFromUrl';

jest.mock('../../utils/extractIdFromUrl');

const testCharacter: Character = {
  name: 'John Doe',
  height: '180',
  mass: '75',
  hair_color: 'brown',
  skin_color: 'light',
  eye_color: 'blue',
  birth_year: '1990',
  gender: 'male',
  url: 'http://example.com/api/characters/1/',
};

const defaultProps = {
  loading: false,
  error: false,
  errorMessage: '',
  searchTerm: 'John',
  searchData: [testCharacter],
  items: 1,
};

describe('SearchResult', () => {
  beforeEach(() => {
    (extractIdFromUrl as jest.Mock).mockReturnValue('1');
  });

  test('renders SearchResult component with search results', () => {
    render(<SearchResult {...defaultProps} />);

    expect(screen.getByText(/Search result:/i)).toBeInTheDocument();
    expect(screen.getByText(/Search result: John/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('All: 1')).toBeInTheDocument();
  });

  test('renders empty search results', () => {
    render(<SearchResult {...defaultProps} searchData={[]} items={0} />);

    expect(screen.getByText(/Search result:/i)).toBeInTheDocument();
    expect(screen.getByText(/Search result: John/i)).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('All: 0')).toBeInTheDocument();
  });

  test('handles character click and closes details panel', () => {
    render(<SearchResult {...defaultProps} />);

    const detailsButton = screen.getByText(/Details/i);
    fireEvent.click(detailsButton);

    expect(screen.getByText(/Character Details/i)).toBeInTheDocument();

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Character Details/i)).not.toBeInTheDocument();
  });

  test('throws an error when error prop is true', () => {
    const originalError = console.error;
    console.error = jest.fn(); // suppress error logging

    expect(() => {
      render(<SearchResult {...defaultProps} error={true} />);
    }).toThrow('Manual error for test');

    console.error = originalError;
  });
});
