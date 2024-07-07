import { ChangeEvent, ReactNode } from 'react';

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface AppProps {}

export interface AppState {
  searchTerm: string;
  searchData: Character[] | null;
  error: boolean;
  errorMessage: string;
  loading: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export interface SearchInputProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onErrorTest: () => void;
}

export interface SearchResultProps {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  searchTerm: string;
  searchData: Character[] | null;
}
