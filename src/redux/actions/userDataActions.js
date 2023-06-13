import axios from "axios";
import ApiRoutes from "../../constants/ApiRoutes";
import {setUser} from "../slices/authSlice";
import {
  addAddress,
  createOrder,
  deleteAddress,
  deleteCart,
  setAddresses,
  setCart,
  setOrderFilters,
  setOrders,
  updateAddress,
  updateCart,
} from "../slices/userDataSlice";
import Store from "../store";
import queryString from "query-string";
import {createReview} from "../slices/productSlice";

export const fetchUserAddresses = async (dispatch, userId) => {
  try {
    const res = await axios.get(`${ApiRoutes.FETCH_USER_OWN_ADDRESSES}/${userId}`);
    if (res.data.success) {
      dispatch(setAddresses(res.data.userAddresses));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const createNewAddress = async (dispatch, form, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.post(ApiRoutes.CREATE_NEW_ADDRESS, form);
    if (res.data.success) {
      dispatch(addAddress(res.data.newAddress));
      next();
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const updateUserAddress = async (
  dispatch,
  addressId,
  form,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.put(`${ApiRoutes.UPDATE_ADDRESS}/${addressId}`, form);
    if (res.data.success) {
      dispatch(updateAddress(res.data.updatedAddress));
      next();
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const deleteUserAddress = async (
  dispatch,
  addressId,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.delete(`${ApiRoutes.DELETE_ADDRESS}/${addressId}`);
    if (res.data.success) {
      dispatch(deleteAddress(addressId));
      next(res.data.msg);
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const fetchUserCart = async dispatch => {
  try {
    const res = await axios.get(ApiRoutes.FETCH_USER_OWN_CART);
    if (res.data.success) {
      dispatch(setCart(res.data.cart));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const fetchUserOrders = async dispatch => {
  const {orderFilters} = Store.store.getState().userData;
  const params = queryString.stringify(orderFilters);
  try {
    const res = await axios.get(`${ApiRoutes.FETCH_USER_OWN_ORDERS}?${params}`);
    if (res.data.success) {
      const {content, totalPages} = res.data.data;
      dispatch(setOrders(content));
      dispatch(setOrderFilters({totalPages}));
    }
  } catch (error) {
    console.log(error.response ? error.response.msg : error.message);
  }
};

export const changeOrderFilters = async (dispatch, newFilters) => {
  dispatch(setOrderFilters(newFilters));
  fetchUserOrders(dispatch);
};

export const createNewOrder = async (
  dispatch,
  request,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.post(ApiRoutes.CREATE_ORDER, request);
    if (res.data.success) {
      dispatch(createOrder(res.data.newOrder));
      next();
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const updateUserInformation = async (
  dispatch,
  userId,
  form,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.put(`${ApiRoutes.UPDATE_INFORMATION}/${userId}`, form);
    if (res.data.success) {
      dispatch(setUser(res.data.updatedUser));
      next();
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const updateUserCart = async (dispatch, form, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.put(ApiRoutes.UPDATE_CART, form);
    if (res.data.success) {
      const cartItem = res.data.cartItem;
      dispatch(updateCart(cartItem));
      next();
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const deleteUserCart = async (dispatch, id, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.delete(`${ApiRoutes.DELETE_CART}/${id}`);
    if (res.data.success) {
      dispatch(deleteCart(id));
      next(res.data.msg);
    }
  } catch (error) {
    errorHandle(error.response !== null ? error.response.msg : error.message);
  }
};

export const createProductReview = async (
  dispatch,
  productId,
  form,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.post(`${ApiRoutes.CREATE_REVIEW}?productId=${productId}`, form);
    if (res.data.success) {
      dispatch(
        createReview({
          productId,
          review: res.data.newReview,
        })
      );
      next();
    }
  } catch (error) {
    errorHandle(error.response !== null ? error.response.msg : error.message);
  }
};
