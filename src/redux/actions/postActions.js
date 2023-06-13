import axios from "axios";
import queryString from "query-string";
import ApiRoutes from "../../constants/ApiRoutes";
import {setFilteredPosts, setPostFilters, setPosts} from "../slices/postSlice";
import Store from "../store";

export const fetchAllPosts = async dispatch => {
  try {
    const res = await axios.get(ApiRoutes.FETCH_POSTS);
    if (res.data.success) {
      dispatch(setPosts(res.data.posts));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const fetchFilteredPosts = async dispatch => {
  const postFilters = Store.store.getState().post.postFilters;
  try {
    const params = queryString.stringify(postFilters);
    const res = await axios.get(`${ApiRoutes.FETCH_POSTS}?${params}`);
    if (res.data.success) {
      const {content, totalPages} = res.data.data;
      dispatch(setFilteredPosts(content));
      dispatch(setPostFilters({totalPages}));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const changePostFilters = async (dispatch, newFilters) => {
  dispatch(setPostFilters(newFilters));
  fetchFilteredPosts(dispatch);
};
