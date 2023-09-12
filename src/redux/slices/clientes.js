import { createSlice } from '@reduxjs/toolkit';
import { addRecibo } from '../actions/recibosActions';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  data: [],
  filteredData: [],
  filter: { name: '', value: '' },
};
const slice = createSlice({
  name: 'clientes',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    setData(state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
      state.filteredData = action.payload;
      state.filter = { name: '', value: '' };
    },

    resetFilteredData(state) {
      state.filteredData = state.data;
      state.filter = { name: '', value: '' };
    },
    setFilteredData(state, action) {
      state.filteredData = action.payload.filtered;
      state.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
  },
  extraReducers: builder => {
    builder.addCase(addRecibo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addRecibo.fulfilled, (state, actions) => {
      state.isLoading = false;
    });
    builder.addCase(addRecibo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// Reducer
export default slice.reducer;
export const { startLoading, hasError, stopLoading, resetFilteredData, setFilteredData, setData } = slice.actions;
// -----------------------------------
