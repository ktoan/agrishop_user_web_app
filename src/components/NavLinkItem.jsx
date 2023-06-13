import React from "react";
import {NavLink} from "react-router-dom";

const NavLinkItem = ({data}) => {
  return (
    <li className="nav-item">
      <NavLink
        to={data.to}
        className={({isActive}) => (isActive ? "nav-link active-nav__link" : "nav-link")}
      >
        {data.route_name}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
