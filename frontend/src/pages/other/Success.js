import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import axios from "axios";

const Cart = ({ location, deleteAllFromCart, user }) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  useEffect(() => {
    deleteAllFromCart(addToast);
  }, []);
  useEffect(() => {
    (async function () {
      if (user) {
        const userID = user.CUST_ID;
        try {
          const { data } = await axios.post("/api/user/dlete-cart", {
            userID,
          });
        } catch (error) {}
      }
    })();
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Thepaaki | Succes</title>
        <meta
          name="description"
          content="Succes page of thepaaki website page"
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Success
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <CheckCircleIcon
                      sx={{ color: "green", fontSize: "100px" }}
                    />
                  </div>
                  <div className="item-empty-area__text">
                    Succesfully Ordered 
                    <br />{" "}
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      Shop Now
                    </Link>   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  user: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    deleteAllFromCart: PropTypes.func,
    user: state.userData.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
