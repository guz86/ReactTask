import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from './Interfaces';

import { PEOPLE_SEARCH_URL } from './constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: PEOPLE_SEARCH_URL }),
  endpoints: (builder) => ({
    searchCharacters: builder.query<
      { results: Character[]; count: number },
      { term: string; page: number }
    >({
      query: ({ term, page }) => `?search=${term}&page=${page}`,
    }),
  }),
});

export const { useSearchCharactersQuery } = apiSlice;
