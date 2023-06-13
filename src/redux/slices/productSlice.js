const {createSlice} = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  filteredProducts: [],
  productFilters: {
    nameLike: "",
    sortBy: "id",
    sortDir: "desc",
    limit: 3,
    page: 0,
    totalPages: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setProductFilters: (state, action) => {
      state.productFilters = {...state.productFilters, ...action.payload};
    },
    createReview: (state, action) => {
      const {productId, review} = action.payload;
      let index = state.products.findIndex(p => p.id === productId);
      state.products[index].reviews.push(review);
    },
  },
});

export const {setFilteredProducts, setProductFilters, setProducts, createReview} =
  productSlice.actions;
export default productSlice.reducer;
