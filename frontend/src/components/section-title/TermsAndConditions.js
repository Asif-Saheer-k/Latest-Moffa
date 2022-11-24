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
          <h1>Terms & Conditions</h1>
        </div>
        <div>
          <p style={{textAlign:"justify"}}>
            Your use of the Website and services and tools are governed by the
            following terms and conditions (“Terms of Use”) as applicable to the
            Website including the applicable policies which are incorporated
            herein by way of reference. If you transact on the Website, You
            shall be subject to the policies that are applicable to the Website
            for such transactions.
          </p>

          <div className="ms-2">
            <ol type="1">
              <li>
                Revisions
                <p>
                  The materials appearing on the web site could include
                  technical, typographical, or photographic errors. MOFFA CLOTHING does
                  not warrant that any of the materials on its web site are
                  accurate, complete, or current. The materials, contents and
                  photos in the site can be changed at any time without notice.
                </p>
              </li>
              <li>
                Links
                <p>
                  MOFFA CLOTHING has not reviewed all of the sites linked to its Internet
                  web site and is not responsible for the contents of any such
                  linked site. The inclusion of any link does not imply
                  endorsement. Use of any such linked web site is at the user’s
                  own risk.
                </p>
              </li>
              <li>
                Site Terms of Use Modifications
                <p>
                MOFFA CLOTHING have the right to revise these terms of use for its web
                  site at any time without notice. By using this web site you
                  are agreeing to be bound by the then current version of these
                  Terms and Conditions of Use.
                </p>
              </li>
              <li>
                Your Account and Registration Obligations
                <p>
                  By using the Website, You shall be responsible for maintaining
                  the confidentiality of your Login Email and Password, and You
                  shall be responsible for all activities that occur under your
                  Login
                </p>
              </li>
              <li>
                Your Account and Registration Obligations
                <p>
                  By using the Website, You shall be responsible for maintaining
                  the confidentiality of your Login Email and Password, and You
                  shall be responsible for all activities that occur under your
                  Login Email. You agree that if any information provided by You
                  that is inconsistent, inaccurate, not current or incomplete,
                  or We have reasonable grounds to suspect that such information
                  is inconsistent, inaccurate, not current or incomplete, or not
                  in accordance with these Terms of Use, We reserve the right to
                  indefinitely suspend or terminate or block access of your
                  membership on the Website and refuse You access to the
                  Website.
                </p>
              </li>
              <li>
                Governing Law
                <p>
                  Any claim relating to the website of MOFFA CLOTHING shall be governed
                  by the laws of the State of Kerala without regard to its
                  conflict of law provisions.
                </p>
              </li>
              <li>
                Disclaimer
                <p>
                  Your use of the Website and services and tools are governed by
                  the following terms and conditions (“Terms of Use”) as
                  applicable to the Website including the applicable policies.
                  If you transact on the Website, You shall be subject to the
                  policies that are applicable to the Website for such
                  transactions. If you require any more information or have any
                  questions about our site’s disclaimer, please feel free to
                  <span className="text-primary">contact us</span>
                </p>
                <ol style={{ listStyleType: "circle" }}>
                  <li>
                    Disclaimers for MOFFA CLOTHING:
                    <p>
                      All the information on this website is published in good
                      faith and for general information purpose only. MOFFA CLOTHING does
                      not make any warranties about the completeness,
                      reliability, and accuracy of this information. Any action
                      you take upon the information you find on this website is
                      strictly at your own risk. We will not be liable for any
                      losses and/or damages in connection with the use of our
                      website.
                    </p>
                  </li>
                  <li>
                    Consent
                    <p>
                      By using our website, you hereby consent to our disclaimer
                      and agree to its terms.
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
          </div>
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
