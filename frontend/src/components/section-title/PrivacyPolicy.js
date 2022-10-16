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
          <h1>Privacy Policy</h1>
        </div>
        <div>
          <p>
            This privacy policy has been compiled to better serve those who are
            concerned with how their ‘Personally identifiable information’ (PII)
            is being used online. Please read our privacy policy carefully to
            get a clear understanding of how we collect, use, protect or
            otherwise handle your Personally Identifiable Information in
            accordance with our website.
          </p>
        </div>
        <ol type="A">
          <li>
            What personal information do we collect from the people that visit
            our blog, website or app?
            <p>
              When ordering or registering on our site, as appropriate, you may
              be asked to enter your name, email address, mailing address, phone
              number or other details to help you with your experience.
            </p>
          </li>
          <li>
            How do we use your information?
            <p>
              We may use the information we collect from you when you register,
              make a purchase, sign up for our newsletter, respond to a survey
              or marketing communication, surf the website, or use certain other
              site features in the following ways:
            </p>
          </li>
          <li>
            Protection of Information
            <p>
              Your personal information is contained behind secured networks and
              is only accessible by a limited number of persons who have special
              access rights to such systems, and are required to keep the
              information confidential. We implement a variety of security
              measures when a user places an order enters, submits, or accesses
              their information to maintain the safety of your personal
              information.
            </p>
          </li>
          <li>
            Third Party Disclosure
            <p>
              We do not sell, trade, or otherwise transfer to outside parties
              your personally identifiable information unless we provide you
              with advance notice. This does not include website hosting
              partners and other parties who assist us in operating our website,
              conducting our business, or servicing you, so long as those
              parties agree to keep this information confidential. We may also
              release your information when asked to do so to comply with the
              law, enforce our site policies, or protect ours or others’ rights,
              property, or safety.
            </p>
          </li>
          <li>
            Contacting Us
            <p>
              If there are any questions regarding this privacy policy you may
              contact us using the contact information in our website
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
