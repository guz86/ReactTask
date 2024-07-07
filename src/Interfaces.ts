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
}
