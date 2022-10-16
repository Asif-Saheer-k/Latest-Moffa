import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Moffa Clothing</h1>
          <p>
            An exclusive women’s and junior’s fashion store and Boutique at
            Ernakulam in KERALA. We started our retail store at Ernakulam on
            2019 and our online journey started 2 years back through our
            Facebook and Instagram. Due to the overwhelming response from
            customers all over India, we plan for an online store for our
            customers to know the stock available and easy purchase through
            online. Our shop is located in Ernakulam, Kerala, we welcome all our
            clients to out store situated at Convent Road Ernakulam (Dist),
            Kerala, India
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
