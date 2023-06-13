import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  cart: [],
  orders: [],
  orderFilters: {
    page: 0,
    limit: 3,
    totalPages: 0,
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const updatedAddress = action.payload;
      const newData = [...state.addresses];
      let updatedIndex = newData.findIndex(a => a.id === updatedAddress.id);
      newData[updatedIndex] = updatedAddress;
      state.addresses = [...newData];
    },
    deleteAddress: (state, action) => {
      const newData = [...state.addresses];
      let removedIndex = newData.findIndex(a => a.id === action.payload);
      newData.splice(removedIndex, 1);
      state.addresses = [...newData];
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    changeCartItemQuantity: (state, action) => {
      const {cartId, quantity} = action.payload;
      const newData = [...state.cart];
      let updatedIndex = newData.findIndex(i => i.id === cartId);
      newData[updatedIndex].quantity = quantity;
      state.cart = [...newData];
    },
    updateCart: (state, action) => {
      const newData = [...state.cart];
      const cartItem = action.payload;
      let existedIndex = newData.findIndex(c => c.id === cartItem.id);
      if (existedIndex !== -1) {
        newData[existedIndex].quantity = cartItem.quantity;
      } else {
        newData.push(cartItem);
      }
      state.cart = [...newData];
    },
    deleteCart: (state, action) => {
      let removedIndex = state.cart.findIndex(c => c.id === action.payload);
      state.cart.splice(removedIndex, 1);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderFilters: (state, action) => {
      state.orderFilters = {...state.orderFilters, ...action.payload};
    },
    createOrder: (state, action) => {
      const newData = [...state.orders];
      newData.push(action.payload);
      state.orders = [...newData];
    },
  },
});

export const {
  setAddresses,
  setCart,
  changeCartItemQuantity,
  updateCart,
  deleteCart,
  setOrders,
  createOrder,
  setOrderFilters,
  addAddress,
  updateAddress,
  deleteAddress,
} = userDataSlice.actions;
export default userDataSlice.reducer;
