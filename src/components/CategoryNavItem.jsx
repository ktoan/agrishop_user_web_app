import React from "react";

const CategoryNavItem = ({data}) => {
  return (
    <li>
      <a className="dropdown-item" href="/#">
        <i className="fa fa-user"></i> {data.name}
      </a>
    </li>
  );
};

export default CategoryNavItem;
