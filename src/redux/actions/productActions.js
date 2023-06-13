import axios from "axios";
import queryString from "query-string";
import ApiRoutes from "../../constants/ApiRoutes";
import {setFilteredProducts, setProductFilters, setProducts} from "../slices/productSlice";

import Store from "../store";

export const fetchAllProducts = async dispatch => {
  try {
    const res = await axios.get(ApiRoutes.FETCH_PRODUCTS);
    if (res.data.success) {
      dispatch(setProducts(res.data.products));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const fetchFilteredProducts = async dispatch => {
  const productFilters = Store.store.getState().product.productFilters;
  try {
    const params = queryString.stringify(productFilters);
    const res = await axios.get(`${ApiRoutes.FETCH_PRODUCTS}?${params}`);
    if (res.data.success) {
      const {content, totalPages} = res.data.data;
      dispatch(setFilteredProducts(content));
      dispatch(setProductFilters({totalPages}));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const changeProductFilters = async (dispatch, newFilters) => {
  dispatch(setProductFilters(newFilters));
  fetchFilteredProducts(dispatch);
};

export const fetchProductDetails = async (productId, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.get(`${ApiRoutes.FETCH_PRODUCTS}/${productId}`);
    if (res.data.success) {
      next(res.data.product);
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};
