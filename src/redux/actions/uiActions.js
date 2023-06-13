import {setPostTypeShowing, setProductTypeShowing} from "../slices/uiSlice";

export const changeProductTypeShowing = (dispatch, showingType) => {
  dispatch(setProductTypeShowing(showingType));
};

export const changePostTypeShowing = (dispatch, showingType) => {
  dispatch(setPostTypeShowing(showingType));
};
