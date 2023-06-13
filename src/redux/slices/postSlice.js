const {createSlice} = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
  filteredPosts: [],
  postFilters: {
    titleLike: "",
    sortBy: "id",
    sortDir: "desc",
    page: 0,
    limit: 3,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
    setPostFilters: (state, action) => {
      state.postFilters = {...state.postFilters, ...action.payload};
    },
  },
});

export const {setPosts, setFilteredPosts, setPostFilters} = postSlice.actions;
export default postSlice.reducer;
