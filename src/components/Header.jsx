import React from "react";
import {FaShoppingBag} from "react-icons/fa";
import {Link} from "react-router-dom";
import Data from "../constants/Data";
import CategoryNavItem from "./CategoryNavItem";
import NavLinkItem from "./NavLinkItem";
import FakeData from "../constants/FakeData";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);
  const {cart} = useSelector(state => state.userData);

  return (
    <>
      <div className="d-flex align-items-center px-4 py-1" style={{backgroundColor: "#ebebeb"}}>
        <p className="mb-0 text-center w-100">Free shipping from all orders over than $100</p>
      </div>
      <div className="main-navbar shadow-sm sticky-top">
        <div className="top-navbar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                <h3 className="brand-name">AgriShop</h3>
              </div>
              <div className="col-md-5 my-auto">
                <div className="input-group">
                  <input type="search" placeholder="Search your product" className="form-control" />
                </div>
              </div>
              <div className="col-md-5 my-auto">
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <Link className="nav-link " to="/cart">
                      <FaShoppingBag /> Cart ({`${cart.length} item${cart.length > 0 ? "s" : ""}`})
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-user"></i> {user.fullName}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to={"/profile"}>
                          <i className="fa fa-user"></i> Profile
                        </Link>
                      </li>
                      <li onClick={() => logoutUser(dispatch)}>
                        <span className="dropdown-item">
                          <i className="fa fa-sign-out"></i> Logout
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid align-items-center">
            <p className="navbar-brand fw-bold d-block d-sm-block d-md-none d-lg-none" href="/#">
              AgriShop
            </p>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i> All Categories
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {FakeData.CATEGORIES.map((item, index) => (
                      <CategoryNavItem key={index} data={item} />
                    ))}
                  </ul>
                </li>
                {Data.NAV_LINKS.map((item, index) => (
                  <NavLinkItem data={item} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
