import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/img/logo/Untitled-3.png";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`} >
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img alt="" src={image} />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
