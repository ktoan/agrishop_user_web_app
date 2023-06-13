import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectUnauthorizedRoutes = () => {
  const {user} = useSelector(state => state.auth);
  return !user ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectUnauthorizedRoutes;
