import {createSlice} from "@reduxjs/toolkit";
import Data from "../../constants/Data";

const initialState = {
  productTypeShowing: Data.SHOW_LIST_TYPE.GRID,
  postTypeShowing: Data.SHOW_LIST_TYPE.GRID,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setProductTypeShowing: (state, action) => {
      state.productTypeShowing = action.payload;
    },
    setPostTypeShowing: (state, action) => {
      state.postTypeShowing = action.payload;
    },
  },
});

export const {setProductTypeShowing, setPostTypeShowing} = uiSlice.actions;
export default uiSlice.reducer;
