import React from "react";
import Images from "../constants/Images";

const AuthLayout = ({children, bg}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="row bg-white shadow box-area">
        <div className="col-md-6 no-padding">
          <img
            src={bg ? bg : Images.loginBg}
            alt="Login background"
            className="w-100 h-100"
            style={{objectFit: "cover"}}
          />
        </div>
        <div className="col-md-6 py-4 px-3">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
