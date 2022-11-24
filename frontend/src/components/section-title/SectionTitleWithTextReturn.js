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
          <h1>Returns & Refund Policy</h1>
        </div>
        <div style={{textAlign:"justify"}}>
          <h4>1.Complaints</h4>
          <p>
            Complaints about Product quality should be done within 24 hours of
            the delivery. To launch a complaint, please contact
            <span className="text-primary"> thepaaki.aws@gmail.com</span>. If the
            reason for return is genuine, Our Team will replace the item.
          </p>
          <h4>2.Refund Policy</h4>

          <p>
            We do not issue refunds once the order is processed and the product
            is delivered. Still, we realize that exceptional situations can
            happen in regard to the character of the product we supply. Below
            are the situations we can provide you with a refund:
          </p>
          <div className="ms-2">
            <ol type="A">
              <li>
                Non-delivery of the product:
                <p>
                  If the order is pre-paid and if for some unforeseeable reason,
                  we are unable to deliver your order, we will refund the
                  amount.
                </p>
              </li>
              <li>
                Major defects :
                <p>
                  Although all our products undergo a vigorous quality check
                  before delivery, unexpected damages and defects may occur. In
                  case of such issues, please report the problem to our Quality
                  Support Team within 24 hours of delivery. If the complaint is
                  genuine, we will replace the same.
                </p>
              </li>
              <li>
                Product not-as-described:
                <p>
                  In case the product is not as described, please report the
                  issue to our Quality Support Team within 12 hours from the
                  date of the delivery. Please provide proof to prove that the
                  purchased product is not the same as described in the website.
                  If the claim is found to be true, we will refund the amount in
                  the next 72 hours.
                </p>
              </li>
            </ol>
          </div>
          <h4>3.Cancellation of Order</h4>

          <p>
            Once you have booked the order, we do not encourage cancellation
            from user end. For payment made online, the refund will be done to
            bank account only within 72 hours.
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
