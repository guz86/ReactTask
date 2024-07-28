import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedItemsState = string[];

const initialState: SelectedItemsState = [];

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    deselectItem: (state, action: PayloadAction<string>) => {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { selectItem, deselectItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
