import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import uiReducer from "./slices/uiSlice";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import postReducer from "./slices/postSlice";
import productReducer from "./slices/productSlice";
import userDataReducer from "./slices/userDataSlice";
import categoryReducer from "./slices/categorySlice";

const reducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  post: postReducer,
  product: productReducer,
  userData: userDataReducer,
  category: categoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistRdc = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistRdc,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const Store = {store, persistor};

export default Store;
