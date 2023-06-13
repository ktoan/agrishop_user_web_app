import React from "react";

const Container = ({className, children}) => {
  return <div className={`px-3 py-5 ${className}`}>{children}</div>;
};

export default Container;
