import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/img/logo/PAKK.png";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}
    >
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={process.env.PUBLIC_URL + image} />
        </Link>
      </div>
      <p>
        © 2022{" "}
        <a href="/" rel="noopener noreferrer" target="_blank">
          Moffa Clothing
        </a>
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
