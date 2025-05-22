import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NopStoreConfig = {
  COMMERCE_BASE_URL: string;
  API_KEY: string;
};

const initialState: NopStoreConfig = {
  COMMERCE_BASE_URL: '',
  API_KEY: '',
};

const NopStoreConfigSlice = createSlice({
  name: 'nopStoreConfig',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<NopStoreConfig>) {
      state.COMMERCE_BASE_URL = action.payload.COMMERCE_BASE_URL;
      state.API_KEY = action.payload.API_KEY;
    },
  },
});

export const { setConfig } = NopStoreConfigSlice.actions;
export default NopStoreConfigSlice.reducer;
