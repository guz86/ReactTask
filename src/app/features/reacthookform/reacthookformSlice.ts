import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  age: number;
}

const initialState: FormState = {
  name: '',
  age: 0,
};

const reacthookformSlice = createSlice({
  name: 'reacthookform',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<FormState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
    },
  },
});
export const { setUserData } = reacthookformSlice.actions;

export default reacthookformSlice.reducer;
