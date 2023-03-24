import { createSlice } from '@reduxjs/toolkit';
// ----------------------------------------------------------------------

const initialState = {
  themeMode: 'light',
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    onChangeMode(state, action) {
      return {
        ...state,
        themeMode: action.payload,
      };
    },
    onResetSettings() {
      return initialState;
    },
  },
});

// Reducer
export default slice.reducer;
export const { onChangeMode, onResetSettings } = slice.actions;
