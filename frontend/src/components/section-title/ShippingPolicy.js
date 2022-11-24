import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container mt-5">
        <div className="welcome-content text-center">
          <h1 style={{textAlign:"justify"}}>Shipping & Delivery Policy</h1>
          <p style={{textAlign:"justify"}}>
            For International buyers, orders are shipped and delivered through
            registered international courier companies and/or International
            speed post only. For domestic buyers, orders are shipped through
            registered domestic courier companies and /or speed post only.
            Orders are shipped within 3-5 days or as per the delivery date
            agreed at the time of order confirmation and delivering of the
            shipment subject to Courier Company / post office norms. MOFFA
            CLOTHING is not liable for any delay in delivery by the courier
            company / postal authorities and only guarantees to hand over the
            consignment to the courier company or postal authorities within 3-5
            days from the date of the order and payment or as per the delivery
            date agreed at the time of order confirmation. Delivery of all
            orders will be to the address provided by the buyer. Delivery of our
            services will be confirmed on your mail ID as specified during
            registration. For any issues in utilizing our services you may
            contact our helpdesk on thepaaki.aws@gmail.com
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
