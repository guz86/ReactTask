import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
};

const reacthookformSlice = createSlice({
  name: 'reacthookform',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<FormState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const { setUserData } = reacthookformSlice.actions;

export default reacthookformSlice.reducer;
