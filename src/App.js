import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-credit-cards/es/styles-compiled.css";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "./assets/styles/style.css";
import Cart from "./pages/app/Cart";
import Checkout from "./pages/app/Checkout";
import Home from "./pages/app/Home";
import Posts from "./pages/app/Posts";
import Product from "./pages/app/Product";
import Shop from "./pages/app/Shop";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyAccount from "./pages/auth/VerifyAccount";
import {loadUser} from "./redux/actions/authActions";
import ProtectAuthenticatedRoute from "./security/ProtectAuthenticatedRoute";
import ProtectUnauthorizedRoutes from "./security/ProtectUnauthorizedRoutes";
import {setAuthToken} from "./utils/setAuthToken";
import Profile from "./pages/app/Profile";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const dispatch = useDispatch();

  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    setAuthToken(token);
    loadUser(dispatch);
  }, [dispatch, token]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<ProtectUnauthorizedRoutes />}>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectAuthenticatedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
