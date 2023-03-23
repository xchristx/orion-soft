import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapseClick: false,
  collapseHover: false,
};
const slice = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    // START LOADING
    handleToggleCollapse(state) {
      state.collapseClick = !state.collapseClick;
    },
    handleHoverEnter(state) {
      state.collapseHover = true;
    },
    handleHoverLeave(state) {
      if (state.collapseClick) {
        state.collapseHover = false;
      }
    },
  },
});
export default slice.reducer;
export const { handleToggleCollapse, handleHoverEnter, handleHoverLeave } = slice.actions;
