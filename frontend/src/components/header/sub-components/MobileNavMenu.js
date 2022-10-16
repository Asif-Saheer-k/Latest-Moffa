import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>HOME</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>ABOUT</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              SHOP
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/cart"}>CART</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>CONTACT US</Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
