import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllPosts, fetchFilteredPosts} from "../redux/actions/postActions";
import {fetchAllProducts, fetchFilteredProducts} from "../redux/actions/productActions";
import {fetchUserAddresses, fetchUserCart, fetchUserOrders} from "../redux/actions/userDataActions";
import {setAuthToken} from "../utils/setAuthToken";
import Footer from "./Footer";
import Header from "./Header";
import {fetchAllCategories} from "../redux/actions/categoryActions";

const AppLayout = ({children}) => {
  const dispatch = useDispatch();

  const {user, token} = useSelector(state => state.auth);

  useEffect(() => {
    setAuthToken(token);
    fetchAllPosts(dispatch);
    fetchFilteredPosts(dispatch);
    fetchAllProducts(dispatch);
    fetchAllCategories(dispatch);
    fetchFilteredProducts(dispatch);
    fetchUserAddresses(dispatch, user.id);
    fetchUserCart(dispatch, user.id);
    fetchUserOrders(dispatch);
  }, [dispatch, user, token]);

  return (
    <div style={{minHeight: "100vh"}}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
