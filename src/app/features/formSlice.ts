import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
  profilePicture: string;
  selectedCountry: string;
  isNewData: boolean;
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  termsAccepted: false,
  profilePicture: '',
  selectedCountry: '',
  isNewData: false,
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
      state.gender = action.payload.gender;
      state.termsAccepted = action.payload.termsAccepted;
      state.profilePicture = action.payload.profilePicture;
      state.selectedCountry = action.payload.selectedCountry;
      state.isNewData = true;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    resetNewDataFlag: (state) => {
      state.isNewData = false;
    },
  },
});
export const { setUserData, setSelectedCountry, resetNewDataFlag } =
  reacthookformSlice.actions;

export default reacthookformSlice.reducer;
